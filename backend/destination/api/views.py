from rest_framework.viewsets import ModelViewSet
from destination.models import Destination
from .serializers import DestinationSerializer

class  DestinationViewSet(ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer