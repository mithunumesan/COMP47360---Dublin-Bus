from django.db import models


class Dublinbusapp(models.Model):
   title = models.CharField(max_length=100)
   description = models.TextField()
   completed = models.BooleanField(default=False)

   def _str_(self):
     return self.title

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models




class Stops(models.Model):
    idstops = models.CharField(primary_key=True, max_length=50)
    stopname = models.CharField(max_length=45, blank=True, null=True)
    stoplat = models.FloatField(blank=True, null=True)
    stoplng = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stops'
