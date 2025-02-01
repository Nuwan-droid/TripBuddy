from rest_framework import serializers
from trips.models import Trip, Activity

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    trip = serializers.PrimaryKeyRelatedField(queryset=Trip.objects.all(), required=False)  # Handle trip as a pk

    class Meta:
        model = Activity
        fields = ['id', 'trip', 'description', 'activity_date', 'activity_time', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']  # Ensure these fields are not provided in the request
