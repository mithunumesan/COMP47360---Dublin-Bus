from django.db import models

# Create your models here.

from datetime import datetime 

class Forecast(models.Model):
    timestamp = models.DateTimeField()
    temperatue = models.DecimalField(max_digits=12,decimal_places=2)
    description = models.CharField(max_length=150)

    def save(self, *args, **kwargs):
        if not self.id:
            self.timestamp = datetime.utcnow()
        return super(Forecast, self).save(*args, **kwargs)