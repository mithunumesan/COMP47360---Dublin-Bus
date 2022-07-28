from django.contrib import admin

from .models import Dublinbusapp

class DublinbusappAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')

admin.site.register(Dublinbusapp, DublinbusappAdmin)
from .models import Stops
from .models import Routes
# class DublinbusappAdmin(admin.ModelAdmin):
#   list = ('title', 'description', 'completed')

admin.site.register(Stops)
admin.site.register(Routes)