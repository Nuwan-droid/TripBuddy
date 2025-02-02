import json
from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from trips.models import Trip, Activity
from destination.models import Destination
from .serializers import TripSerializer, ActivitySerializer
from datetime import datetime
from rest_framework_simplejwt.authentication import JWTAuthentication

class TripView(ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        """Return only trips associated with the logged-in user."""
        return Trip.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'], url_path='add-trip')
    def add_to_trip(self, request):
        user = request.user
        destination_id = request.data.get('destination_id')
        trip_name = request.data.get('trip_name')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        total_budget = request.data.get('total_budget', 0)

        if not all([destination_id, trip_name, start_date, end_date]):
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            start_date_obj = datetime.strptime(start_date, "%Y-%m-%d").date()
            end_date_obj = datetime.strptime(end_date, "%Y-%m-%d").date()

            if start_date_obj >= end_date_obj:
                return Response({"error": "End date must be after start date."}, status=status.HTTP_400_BAD_REQUEST)

            destination = Destination.objects.get(id=destination_id)

            existing_trip = Trip.objects.filter(
                user=user,
                destination_id=destination_id,
                start_date__lte=end_date_obj,
                end_date__gte=start_date_obj
            ).exists()

            if existing_trip:
                return Response({"error": "You already have a trip planned for this destination within this date range."}, status=status.HTTP_400_BAD_REQUEST)

            trip = Trip.objects.create(
                user=user,
                destination_id=destination_id,
                trip_name=trip_name,
                start_date=start_date_obj,
                end_date=end_date_obj,
                total_budget=total_budget
            )

            return Response({'message': 'Trip added successfully!', 'trip': TripSerializer(trip).data}, status=status.HTTP_201_CREATED)

        except Destination.DoesNotExist:
            return Response({"error": "Destination not found."}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='activities')
    def get_trip_activities(self, request, pk=None):
        try:
            trip = Trip.objects.get(id=pk, user=request.user)
            activities = Activity.objects.filter(trip=trip)
            
            if not activities.exists():
                return Response({"message": "No activities found for this trip."}, status=status.HTTP_200_OK)

            serializer = ActivitySerializer(activities, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Trip.DoesNotExist:
            return Response({"error": "Trip not found or does not belong to you."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ActivityViewSet(ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        """Return only activities related to the logged-in user's trips."""
        return Activity.objects.filter(trip__user=self.request.user)
