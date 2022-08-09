from calendar import weekday
from time import time
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest
from requests import Response
from .serializers import AllTripSerializer, DublinbusappSerializer, RoutesSerializer, ShapeSerializer, TripScheduleSerializer
from .serializers import StopsSerializer 
from rest_framework import viewsets      
from .models import AllTrip, Dublinbusapp, Routes, Shape, TripSchedule

from .models import Stops
from rest_framework import generics
from django.db.models import Min, Max
import pickle
import os
import json
from datetime import datetime,timedelta
import time

from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views import View 

def test(request):
    return render(request, 'main.html')

class DublinbusappView(viewsets.ModelViewSet):
    serializer_class = DublinbusappSerializer   
    queryset = Dublinbusapp.objects.all()

class StopsView(viewsets.ModelViewSet):
    serializer_class = StopsSerializer   
    queryset = Stops.objects.all()

class RoutesView(viewsets.ModelViewSet):
    serializer_class = RoutesSerializer  
    queryset = Routes.objects.all()

class AllTripListView(generics.ListAPIView):
    serializer_class = AllTripSerializer

    def get_queryset(self):

        queryset = AllTrip.objects.all()
        shape_id = self.request.query_params.get('shapeid','')
        if shape_id is not None:
            queryset = queryset.filter(shapeid=shape_id)
        return queryset

    
class ShapeListView(generics.ListAPIView):
    serializer_class = ShapeSerializer
    

    def get_queryset(self):

        queryset = Shape.objects.all()
        shape_id = self.request.query_params.get('shapeid','')
        if shape_id is not None:
            queryset = queryset.filter(shapeid=shape_id)
            
        return queryset


class TripScheduleListView(View):
   
    
    def get(self,request):
        print("get this API! get this API! get this API! get this API! get this API! get this API! get this API! ")
        models=[]
        queryset = TripSchedule.objects.all()
        route_short_name = request.GET.get('routeshortname','')
        stop_name = request.GET.get('stopname','')
        arrival_time = request.GET.get('arrivaltime','')
        durStopNum = request.GET.get('stopNum','')
        selectedValue = request.GET.get('selectedValue','')
        selectDate = request.GET.get('selectedDate','')
        endData=datetime.now()

        stop_name=stop_name.split(",")[0]
        if(selectedValue=='now'):

            now=datetime.now()
            selectDate=now.strftime('%Y-%m-%d')

        else:
            selectDate=selectDate.split("T")[0]
            #arrival_time=arrival_time.split("T")[1]
        
        
       
        print(arrival_time)
        arrival_time=convert24(arrival_time)
        print(arrival_time)
        print(selectDate)
        
       
        direction='1'
        gtfsState='0'
        startTripId=''
        stopNum=0
        journryTime=0
        statArrTime=""
        startTime=""
        durTime=0
        endTime=""

        
        
        if route_short_name is not None and stop_name is not None and arrival_time is not None:
            queryset = queryset.filter(routeshortname=route_short_name,stopname__startswith=stop_name,arrivaltime__gte=arrival_time).order_by('arrivaltime')[:1]

        if(queryset.exists()):
            resultData=queryset[0]
           
            direction=resultData.directionid
            startTripId=resultData.tripid
            stopNum=resultData.stopsequence-1
            #now_hour = datetime.strftime(arrival_time,"%H:%M")
            arrTime=str(arrival_time)
            pre_hour=int(arrTime.split(":")[0])
            x_list=[]
            
            models=get_models_array(direction,route_short_name)  
            hourList=[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
            pre_hourList=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            for i in range(len(hourList)):
                if hourList[i]==pre_hour:
                    pre_hourList[i]=1

            for j in pre_hourList:
                x_list.append(j)
            print(selectDate)
            weekDay = datetime.strptime(selectDate, "%Y-%m-%d").weekday()
            weekdayList=[0,1,2,3,4,5,6]
            pre_weekday=[0,0,0,0,0,0,0]
            for i in range(len(weekdayList)):
                if weekdayList[i]==weekDay:
                    pre_weekday[i]=1
            for m in pre_weekday:
                x_list.append(m)

            pre_rushHourList=[0,0]
            if pre_hour in [8,9,10,16,17,18]:
                pre_rushHourList[1]=1
           
            for k in pre_rushHourList:
                x_list.append(k)
            
          
            if(len(models)>0):
                
                prediction = models[0].predict([x_list])
               
            
                predict_list = prediction.tolist()

                journryTime = str(predict_list[0])


                queryset = TripSchedule.objects.all()
                queryset = queryset.filter(tripid=startTripId,stopsequence=1)

                statArrTime=str(queryset[0].arrivaltime)

                startDurTime=int(int(float(journryTime)*int(stopNum))/60)
                arriDateStrF=selectDate+" "+statArrTime

                arriDateTime=datetime.strptime(arriDateStrF, "%Y-%m-%d %H:%M:%S")

                
                arriDateTimeAdd=arriDateTime+timedelta(minutes=startDurTime)
                startTime=str(arriDateTimeAdd.hour)+":"+str(arriDateTimeAdd.minute)


                durTime=int(int(float(journryTime)*int(durStopNum))/60)
            
                endTimeDate=arriDateTimeAdd+timedelta(minutes=durTime)
                endTime=str(endTimeDate.hour)+":"+str(endTimeDate.minute)
            else:
                 gtfsState='1'   
            
        else:
            gtfsState='1'       
        


       
        queryset={
            "gtfsState":gtfsState,
            "startTime":startTime,
            "durTime":durTime,
            "endTime":endTime
        } 
        print(queryset)
        return HttpResponse(json.dumps(queryset))

def get_models_array(direction,LinedId):
    models=[]
    try:
        all_model_paths=[]
        flag=False
        model_name = "model_{}_{}.pkl".format(LinedId,direction)
        
        for modelPath in os.listdir('./Dublinbusapp/static/pkls'):
            if model_name==modelPath:
                flag=True
        if(flag):

            print('FOUND A  MODEL')
            with open('./Dublinbusapp/static/pkls/model_{}_{}.pkl'.format(LinedId,direction), 'rb') as handle:
                model = pickle.load(handle)
                models.append(model)
        else:
            print('NO  MODEL')
             
    except:
        import traceback
        traceback.print_exc()
    return models


def convert24(str1):
    print(str1)
    if(int(str1.split(":")[0])<10):
        str1='0'+str1
    if str1[-2:] == "am" and str1[:2] == "12":
        return "00" + str1[2:-2]
    elif str1[-2:] == "am" :
        return str1[:-2]
    elif str1[-2:] == "pm" and str1[:2] == "12":
        return str1[:-2]
    else:
        return str(int(str1[:2]) + 12) + str1[2:-2]


