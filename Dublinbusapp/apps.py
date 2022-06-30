from django.apps import AppConfig


class DublinbusappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Dublinbusapp'

    def ready(self):
        print("accessed")
        from Dublinbusapp.forecastUpdater import update
        update.start()

# class WeatherConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'weather'

#     def ready(self):
        
#         from Dublinbusapp.forecastUpdater import update
#         update.start()