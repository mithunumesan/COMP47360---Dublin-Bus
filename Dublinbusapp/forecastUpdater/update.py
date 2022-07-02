from datetime import datetime
import os

from apscheduler.schedulers.background import BackgroundScheduler
from Dublinbusapp.forecastUpdater import forecast_api

        
def start():
        scheduler = BackgroundScheduler()
        print("updated!")
        scheduler.add_job(forecast_api.update_forecast, 'interval', seconds=150)
        print("job added")
        scheduler.start()
        print("scheduler started")