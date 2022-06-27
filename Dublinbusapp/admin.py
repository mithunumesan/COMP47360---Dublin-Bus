from django.contrib import admin

from .models import dublinbusapp

class DublinbusappAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')

admin.site.register(dublinbusapp, DublinbusappAdmin)
