from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TripView, ActivityViewSet

# Create a router and register the viewsets
router = DefaultRouter()
router.register(r'trips', TripView, basename='trip')
router.register(r'activities', ActivityViewSet, basename='activity')

# Include the router's URLs
urlpatterns = [
    path('', include(router.urls)),
]
