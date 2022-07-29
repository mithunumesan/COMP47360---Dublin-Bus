from django.db import models


class Dublinbusapp(models.Model):
   title = models.CharField(max_length=100)
   description = models.TextField()
   completed = models.BooleanField(default=False)

   def _str_(self):
     return self.title

# class Routes(models.Model):
#     routeid = models.CharField(db_column='routeId', primary_key=True, max_length=50)  # Field name made lowercase.
#     agencyid = models.CharField(db_column='agencyId', max_length=50, blank=True, null=True)  # Field name made lowercase.
#     routeshortname = models.CharField(db_column='routeShortName', max_length=50, blank=True, null=True)  # Field name made lowercase.
#     routelongname = models.CharField(db_column='routeLongName', max_length=200, blank=True, null=True)  # Field name made lowercase.
#     routetype = models.IntegerField(db_column='routeType', blank=True, null=True)  # Field name made lowercase.

#     class Meta:
#         managed = False
#         db_table = 'routes'


class Stops(models.Model):
    stopid = models.CharField(db_column='stopid',max_length=45, primary_key=True)
    stopname = models.CharField(db_column='stopname',max_length=255, blank=True, null=True)
    latitude = models.FloatField(db_column='latitude',blank=True, null=True)
    longitude = models.FloatField(db_column='longitude',blank=True, null=True)
    agencyLineNum = models.TextField(db_column='agencyLineNum',max_length=2000,blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stopLine'


# class Stoptimes(models.Model):
#     tripid = models.CharField(max_length=45, blank=True, null=True)
#     arrivaltime = models.CharField(max_length=45, blank=True, null=True)
#     departuretime = models.CharField(max_length=45, blank=True, null=True)
#     stopid = models.CharField(max_length=45, blank=True, null=True)
#     stopsequence = models.CharField(max_length=45, blank=True, null=True)
#     stopheadsign = models.CharField(max_length=45, blank=True, null=True)
#     pickuptype = models.CharField(max_length=45, blank=True, null=True)
#     dropofftype = models.CharField(max_length=45, blank=True, null=True)
#     shapedistancetraveled = models.CharField(max_length=45, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'stoptimes'


# class Trips(models.Model):
#     routeid = models.CharField(db_column='routeId', max_length=100, blank=True, null=True)  # Field name made lowercase.
#     serviceid = models.CharField(db_column='serviceId', max_length=100, blank=True, null=True)  # Field name made lowercase.
#     tripid = models.CharField(db_column='tripId', max_length=100, blank=True, null=True)  # Field name made lowercase.
#     shapeid = models.CharField(db_column='shapeId', max_length=100, blank=True, null=True)  # Field name made lowercase.
#     tripheadsign = models.CharField(db_column='tripHeadsign', max_length=100, blank=True, null=True)  # Field name made lowercase.
#     directionid = models.CharField(db_column='directionId', max_length=100, blank=True, null=True)  # Field name made lowercase.

#     class Meta:
#         managed = False
#         db_table = 'trips'

class Routes(models.Model):
    routeid = models.CharField(db_column='routeId', max_length=50, blank=True,primary_key = True)  # Field name made lowercase.
    routeshortname = models.CharField(db_column='routeShortName', max_length=50, blank=True, null=True)  # Field name made lowercase.
    routelongname = models.CharField(db_column='routeLongName', max_length=50, blank=True, null=True)  # Field name made lowercase.
    shapeidlist = models.TextField(db_column='shapeIdlist', max_length=1000, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'routeshape'


class AllTrip(models.Model):
    routeid = models.CharField(db_column='routeId', max_length=50,primary_key = True)  # Field name made lowercase.
    shapeid = models.CharField(db_column='shapeId', max_length=50)  # Field name made lowercase.
    tripheadsign = models.CharField(db_column='tripHeadsign',max_length=50)
    routeshortname = models.CharField(db_column='routeShortName', max_length=50)  # Field name made lowercase.
    routelongname = models.CharField(db_column='routeLongName', max_length=50)  # Field name made lowercase.
    directionid = models.IntegerField(db_column='directionId')  # Field name made lowercase.
    stopid = models.CharField(db_column='stopId', max_length=50)
    stopsequence = models.IntegerField(db_column='stopsequence')
    stopname = models.CharField(db_column='stopname', max_length=50)
    latitude = models.FloatField(db_column='latitude',max_length=50)
    longitude = models.FloatField(db_column='longitude',max_length=50)

    class Meta:
       
        managed = False
        db_table = 'drawRoute'

class Shape(models.Model):
    shapeid = models.CharField(db_column='shapId', max_length=50,primary_key = True)  # Field name made lowercase.
    lat = models.FloatField(db_column='shapePtLatitude',max_length=50)
    lng = models.FloatField(db_column='shapePtLongitude',max_length=50)
    # shapePtSequence = models.IntegerField(db_column='shapePtSequence')

    class Meta:
        managed = False
        db_table = 'shape'


class TripSchedule(models.Model):
    routeid = models.CharField(db_column='routeId', max_length=50, blank=True,primary_key = True)  # Field name made lowercase.
    serviceid = models.CharField(db_column='serviceId', max_length=50, blank=True, null=True)
    tripid = models.CharField(db_column='tripId', max_length=50, blank=True, null=True)
    shapeId = models.CharField(db_column='shapeId', max_length=50, blank=True, null=True)
    tripheadsign = models.CharField(db_column='tripHeadsign', max_length=50, blank=True, null=True)
    directionid = models.CharField(db_column='directionId', max_length=50, blank=True, null=True)
    arrivaltime = models.TimeField(db_column='arrivaltime',auto_now=False, auto_now_add=False)
    stopid = models.CharField(db_column='stopid', max_length=50, blank=True, null=True)
    stopsequence =  models.IntegerField(db_column='stopsequence')
    shapedisttraveled = models.FloatField(db_column='shapedisttraveled', max_length=50)
    stopname =  models.CharField(db_column='stopname', max_length=50, blank=True, null=True)
    agencyId = models.CharField(db_column='agencyId', max_length=50, blank=True, null=True)
    routeshortname = models.CharField(db_column='routeShortName', max_length=50, blank=True, null=True)  # Field name made lowercase.
    routelongname = models.CharField(db_column='routeLongName', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tripSchedule'