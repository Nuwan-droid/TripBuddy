from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from trips.models import Trip
from .serializers import TripSerializer

class TripView(ModelViewSet):
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]  # Restrict access to authenticated users

    def get_queryset(self):
        return Trip.objects.filter(user=self.request.user)  # Return trips for logged-in user
