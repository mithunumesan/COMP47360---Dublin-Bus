from django.contrib import admin

# from .models import Dublinbusapp
from .models import Stops
from .models import Stoptimes
from .models import Trips
from .models import Routes
# class DublinbusappAdmin(admin.ModelAdmin):
#   list = ('title', 'description', 'completed')

admin.site.register(Stops)
admin.site.register(Trips)
admin.site.register(Stoptimes)
admin.site.register(Routes)

