from django.contrib import admin

from .models import Dublinbusapp

class DublinbusappAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')

admin.site.register(Dublinbusapp, DublinbusappAdmin)
