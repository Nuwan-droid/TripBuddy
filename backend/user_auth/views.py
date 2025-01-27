from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

# User model and serializer for registration
User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password_confirmation = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirmation']

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirmation')
        return User.objects.create_user(**validated_data)


class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'User created successfully!',
                'user': {
                    'username': user.username,
                    'email': user.email,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return Response({
                    "message": "Login successful.",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    }
                }, status=status.HTTP_200_OK)
            return Response({"error": "User account is inactive."}, status=status.HTTP_403_FORBIDDEN)
        return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
        return Response({"error": "User is not logged in."}, status=status.HTTP_401_UNAUTHORIZED)


class UserDetailView(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "date_joined": user.date_joined,
        })


class CurrentUserView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            return Response({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "date_joined": user.date_joined,
            }, status=status.HTTP_200_OK)
        return Response({"error": "User is not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)
