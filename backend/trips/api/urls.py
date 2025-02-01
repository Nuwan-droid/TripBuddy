from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TripView,ActivityViewSet

# Create a router and register the viewset
router = DefaultRouter()
router.register(r'trips', TripView, basename='trip')  # Register the TripView with the router
router.register(r'activities', ActivityViewSet, basename='activity') 

# Include the router's URLs
urlpatterns = [
    path('', include(router.urls)),  # This will handle all CRUD operations for the `TripView`
]



# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import DestinationViewSet

# router = DefaultRouter()
# router.register('destinations', DestinationViewSet)

# urlpatterns = [
#     path('', include(router.urls))
# ]