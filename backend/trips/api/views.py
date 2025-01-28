from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from trips.models import Trip
from .serializers import TripSerializer

class TripView(ModelViewSet):
    """
    Viewset for handling trip operations
    """
    permission_classes = [IsAuthenticated]
    serializer_class = TripSerializer

    # Override the queryset to filter trips by the logged-in user
    def get_queryset(self):
        return Trip.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """
        Override the create method to associate the trip with the logged-in user.
        """
        data = request.data
        data['user'] = request.user.id  # Attach user ID to the trip data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """
        Override the update method to allow partial updates.
        """
        partial = kwargs.pop('partial', True)  # Default to partial updates
        instance = self.get_object()  # Fetch the specific trip instance
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """
        Override the destroy method to ensure only the owner's trip is deleted.
        """
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message': 'Trip deleted successfully'}, status=status.HTTP_200_OK)
