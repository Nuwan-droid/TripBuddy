from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from trips.models import Trip
from destination.models import Destination
from .serializers import TripSerializer
from datetime import datetime

class TripView(ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]  # Restrict access to authenticated users

    @action(detail=False, methods=['post'])
    def add_trip(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def perform_create(self, serializer):
        # Customize the trip creation logic if needed
        serializer.save()

    def get_queryset(self):
        """Return only trips associated with the logged-in user."""
        return Trip.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'], url_path='add-trip')
    def add_to_trip(self, request):
        """
        Allow authenticated users to add a destination to their trip.
        Prevents adding duplicate trips for the same destination in the same date range.
        """
        user = request.user
        destination_id = request.data.get('destination_id')
        trip_name = request.data.get('trip_name')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        total_budget = request.data.get('total_budget', 0)  # Optional budget field

        # Validate required fields
        if not all([destination_id, trip_name, start_date, end_date]):
            return Response(
                {"error": "All fields (destination_id, trip_name, start_date, end_date) are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Validate date format
            start_date_obj = datetime.strptime(start_date, "%Y-%m-%d").date()
            end_date_obj = datetime.strptime(end_date, "%Y-%m-%d").date()

            if start_date_obj >= end_date_obj:
                return Response(
                    {"error": "End date must be after the start date."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Check if the destination exists
            destination = Destination.objects.get(id=destination_id)

            # Prevent duplicate trips (same destination, overlapping dates)
            existing_trip = Trip.objects.filter(
                user=user,
                destination_id=destination_id,  # Use destination_id instead of destination
                start_date__lte=end_date_obj,
                end_date__gte=start_date_obj
            ).exists()

            if existing_trip:
                return Response(
                    {"error": "You already have a trip planned to this destination within this date range."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create the new trip
            trip = Trip.objects.create(
                user=user,
                destination_id=destination_id,  # Use destination_id
                trip_name=trip_name,
                start_date=start_date_obj,
                end_date=end_date_obj,
                total_budget=total_budget
            )

            return Response(
                {'message': 'Destination successfully added to your trips!', 'trip': TripSerializer(trip).data},
                status=status.HTTP_201_CREATED
            )

        except Destination.DoesNotExist:
            return Response(
                {"error": "Destination not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        except ValueError:
            return Response(
                {"error": "Invalid date format. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
