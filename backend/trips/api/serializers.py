from rest_framework import serializers
from trips.models import Trip, Activity


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'
        
class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'  # Include all fields

