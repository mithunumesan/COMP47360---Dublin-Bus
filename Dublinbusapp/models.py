from django.db import models
from datetime import datetime
import pytz

class Dublinbusapp(models.Model):
   title = models.CharField(max_length=100)
   description = models.TextField()
   completed = models.BooleanField(default=False)

   def _str_(self):
     return self.title

class WeatherData(models.Model):
   timestamp = models.DateTimeField()
   temperatue = models.DecimalField(max_digits=12,decimal_places=2)
   description = models.CharField(max_length=150)
   
   def save(self, *args, **kwargs):
        if not self.id:
            self.timestamp = datetime.now(pytz.timezone("Europe/Dublin"))
        return super(WeatherData, self).save(*args, **kwargs)

