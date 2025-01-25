from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
from django.contrib.auth import get_user_model
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

# User model and serializer for registration
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password_confirmation = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()  # Assuming you are using a custom user model
        fields = ['username', 'email', 'password', 'password_confirmation', 'role']

    def validate(self, data):
        # Ensure passwords match
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        # Remove password_confirmation field before creating the user
        validated_data.pop('password_confirmation')
        user = get_user_model().objects.create_user(**validated_data)
        return user


class RegisterUserView(APIView):
    permission_classes = [AllowAny]  # Allow access without authentication

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'User created successfully!',
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'role': user.role,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    """
    Handles user login.
    """

    def post(self, request):
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return JsonResponse({"error": "Username and password are required."}, status=400)

            user = authenticate(username=username, password=password)

            if user is not None:
                if user.is_active:
                    login(request, user)
                    return JsonResponse({
                        "message": "Login successful.",
                        "user": {
                            "id": user.id,
                            "username": user.username,
                            "email": user.email,
                            "role": user.role,
                        }
                    }, status=200)
                else:
                    return JsonResponse({"error": "User account is inactive."}, status=403)
            else:
                return JsonResponse({"error": "Invalid username or password."}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON."}, status=400)


@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(View):
    """
    Handles user logout.
    """

    def post(self, request):
        if request.user.is_authenticated:
            logout(request)
            return JsonResponse({"message": "Logout successful."}, status=200)
        return JsonResponse({"error": "User is not logged in."}, status=400)


class UserDetailView(View):
    """
    Retrieves user details.
    """

    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        return JsonResponse({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "date_joined": user.date_joined,
        })


class CurrentUserView(View):
    """
    Retrieves details of the currently authenticated user.
    """

    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            return JsonResponse({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,
                "date_joined": user.date_joined,
            }, status=200)
        return JsonResponse({"error": "User is not authenticated."}, status=401)
