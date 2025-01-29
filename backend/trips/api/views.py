from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from trips.models import Trip
from destination.models import Destination   # Import Destination model
from .serializers import TripSerializer

class TripView(ModelViewSet):
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]  # Restrict access to authenticated users

    def get_queryset(self):
        """Return only trips associated with the logged-in user."""
        return Trip.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def add_to_trip(self, request):
        """Allow authenticated users to add destinations to their trips."""
        user = request.user
        destination_id = request.data.get('destination_id')
        trip_name = request.data.get('trip_name')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')

        # Validate required fields
        if not all([destination_id, trip_name, start_date, end_date]):
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            destination = Destination.objects.get(id=destination_id)

            # Create a new trip for the user
            trip = Trip.objects.create(
                user=user,
                destination=destination,
                trip_name=trip_name,
                start_date=start_date,
                end_date=end_date
            )

            return Response({'message': 'Destination added to trip!', 'trip': TripSerializer(trip).data}, status=status.HTTP_201_CREATED)

        except Destination.DoesNotExist:
            return Response({"error": "Destination not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
