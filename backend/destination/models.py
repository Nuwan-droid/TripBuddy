from django.db import models

# Create your models here.
class Destination(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    location = models.TextField()
    image_url = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'destinations'
        verbose_name = 'Destination'
        verbose_name_plural = 'Destinations'
