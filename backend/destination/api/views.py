from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from destination.models import Destination
from .serializers import DestinationSerializer
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

class DestinationViewSet(ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    permission_classes = [AllowAny]


class DestinationDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, destination_id):
        try:
            # Fetch the destination by ID
            destination = Destination.objects.get(id=destination_id)
            serializer = DestinationSerializer(destination)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Destination.DoesNotExist:
            return Response(
                {"error": "Destination not found"},
                status=status.HTTP_404_NOT_FOUND
            )
