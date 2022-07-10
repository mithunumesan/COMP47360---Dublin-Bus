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
    stopid = models.CharField(max_length=50,primary_key = True, blank=True)
    stopname = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stops'


class Stoptimes(models.Model):
    tripid = models.CharField(primary_key=True, max_length=45)
    arrivaltime = models.CharField(max_length=45, blank=True, null=True)
    departuretime = models.CharField(max_length=45, blank=True, null=True)
    stopid = models.CharField(max_length=45, blank=True, null=True)
    stopsequence = models.CharField(max_length=45, blank=True, null=True)
    stopheadsign = models.CharField(max_length=45, blank=True, null=True)
    pickuptype = models.CharField(max_length=45, blank=True, null=True)
    dropofftype = models.CharField(max_length=45, blank=True, null=True)
    shapedistancetraveled = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stoptimes'


class Trips(models.Model):
    routeid = models.CharField(db_column='routeId', max_length=50, blank=True, primary_key = True)  # Field name made lowercase.
    serviceid = models.IntegerField(db_column='serviceId', blank=True, null=True)  # Field name made lowercase.
    tripid = models.CharField(db_column='tripId', max_length=50, blank=True, null=True)  # Field name made lowercase.
    shapeid = models.CharField(db_column='shapeId', max_length=50, blank=True, null=True)  # Field name made lowercase.
    tripheadsign = models.CharField(db_column='tripHeadsign', max_length=50, blank=True, null=True)  # Field name made lowercase.
    directionid = models.IntegerField(db_column='directionId', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'trips'

class Routes(models.Model):
    routeid = models.CharField(db_column='routeId', max_length=50, blank=True, primary_key = True)  # Field name made lowercase.
    agencyid = models.IntegerField(db_column='agencyId', blank=True, null=True)  # Field name made lowercase.
    routeshortname = models.CharField(db_column='routeShortName', max_length=50, blank=True, null=True)  # Field name made lowercase.
    routelongname = models.CharField(db_column='routeLongName', max_length=50, blank=True, null=True)  # Field name made lowercase.
    routetype = models.IntegerField(db_column='routeType', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'routes'
