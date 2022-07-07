from django.contrib import admin

# from .models import Dublinbusapp
from .models import Stops

# class DublinbusappAdmin(admin.ModelAdmin):
#   list = ('title', 'description', 'completed')

admin.site.register(Stops)

