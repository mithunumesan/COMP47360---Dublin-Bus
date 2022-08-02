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
        print(arrival_time)
        print('有页面传过来的时间')
        print(selectDate)
        print("页面传过来的选择日期")

        stop_name=stop_name.split(",")[0]
        if(selectedValue=='now'):
        #     hourStr=''
        #     minStr=''
        #     if(datetime.now().hour+1<10):
        #         hourStr='0'+str(datetime.now().hour+1)
        #     else:
        #         if(datetime.now().hour+1==24):
        #             hourStr='00'
        #         else:
        #             hourStr=str(datetime.now().hour+1)
        #     if(datetime.now().minute<10):
        #         minStr='0'+str(datetime.now().minute)
        #     else:
        #         minStr=str(datetime.now().minute)
            #arrival_time=hourStr+':'+minStr
            now=datetime.now()
            selectDate=now.strftime('%Y-%m-%d')

        else:
            selectDate=selectDate.split("T")[0]
            #arrival_time=arrival_time.split("T")[1]
        
        
       
        print(arrival_time)
        print('传过来的时间')
        arrival_time=convert24(arrival_time)
        print(arrival_time)
        print('查询的时间')
        print(selectDate)
        print('选择日期')
        
       
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
            direction=queryset[0].directionid
            startTripId=queryset[0].tripid
            #传过去
            stopNum=queryset[0].stopsequence-1
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
                print("pklfine pklfine pklfine pklfine pklfine pklfine pklfine pklfine pklfine pklfine pklfine pklfine pklfine pklfine pklfine pklfine")
            
                predict_list = prediction.tolist()
                #传过去
                journryTime = str(predict_list[0])


                queryset = TripSchedule.objects.all()
                queryset = queryset.filter(tripid=startTripId,stopsequence=1)
                #传过去
                statArrTime=str(queryset[0].arrivaltime)
                print(statArrTime)
                print("首站的时间")
                print(stopNum)
                print("从首站到当前站有多少站")
                startDurTime=int(int(float(journryTime)*int(stopNum))/60)
                arriDateStrF=selectDate+" "+statArrTime
                arriDateTime=datetime.strptime(arriDateStrF, "%Y-%m-%d %H:%M:%S")
                print(journryTime)
                print("平均每站时长")
                print(startDurTime)
                print("首站到当前站所用时长")
                
                arriDateTimeAdd=arriDateTime+timedelta(minutes=startDurTime)
                startTime=str(arriDateTimeAdd.hour)+":"+str(arriDateTimeAdd.minute)
                print(startTime)
                print("车出发时间")

                durTime=int(int(float(journryTime)*int(durStopNum))/60)
            
                endTimeDate=arriDateTimeAdd+timedelta(minutes=durTime)
                endTime=str(endTimeDate.hour)+":"+str(endTimeDate.minute)
            else:
                 gtfsState='1'   

            
            
            
            
            #startTime=statArrTime+float(journryTime)*int(stopNum)
            
            #endTime=startTime+durTime
            
            
            
        else:
            gtfsState='1'       
        
            
            
            # min = queryset.annotate(Min('arrivaltime'))
            # queryset = queryset.filter(routeshortname=route_short_name,stopname__startswith=stop_name,arrivaltime=min)
            
            # queryset = queryset.filter(routeshortname=route_short_name,stopname__startswith=stop_name)

       
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
    print("带pm的时间")
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



# class TripFindListView(generics.ListAPIView):
#     serializer_class = TripScheduleSerializer
    

#     def get_queryset(self):

#         queryset = TripSchedule.objects.all()
#         trip_id = self.request.query_params.get('tripid','')
        

#         if trip_id is not None:
#             queryset = queryset.filter(tripid=trip_id,stopsequence=1)
#             # min = queryset.annotate(Min('arrivaltime'))
#             # queryset = queryset.filter(routeshortname=route_short_name,stopname__startswith=stop_name,arrivaltime=min)
            
#             # queryset = queryset.filter(routeshortname=route_short_name,stopname__startswith=stop_name)
            
            
#         return queryset