from rest_framework.viewsets import ModelViewSet
from destination.models import Destination
from .serializers import DestinationSerializer
from rest_framework.permissions import AllowAny

class  DestinationViewSet(ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    permission_classes = [AllowAny]