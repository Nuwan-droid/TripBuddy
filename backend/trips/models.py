from django.db import models
from django.conf import settings
from destination.models import Destination

class Trip(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='trips')
    destination_id = models.IntegerField()  # Keep this field
    trip_name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    total_budget = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'trips'

    def __str__(self):
        return self.trip_name

    @property
    def destination(self):
        """Return the related Destination object."""
        return Destination.objects.get(id=self.destination_id)
    
class Activity(models.Model):
    trip = models.ForeignKey('Trip', on_delete=models.CASCADE)  # Link to a trip
    description = models.TextField()
    activity_date = models.DateField()
    activity_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.trip.trip_name} - {self.description}"