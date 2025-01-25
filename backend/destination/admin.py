from django.contrib import admin
from .models import Destination

@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'created_at')
    search_fields = ('name',)
    list_filter = ('created_at',)
    fields = ('name', 'description', 'image_url')  # Specify the fields to show in the admin form
    readonly_fields = ('created_at',)  # Make the 'created_at' field read-only

