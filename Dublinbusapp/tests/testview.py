from django.test import TestCase
from  Dublinbusapp.views import convert24,AllTripListView
from django.urls import reverse
# Create your tests here.

class PostTest(TestCase):


    def test_convet24_true(self):
        answer = convert24("6:00pm")
        self.assertEqual(answer,"18:00")

    def test_convet24_false(self):
        answer = convert24("6:00pm")
        self.assertNotEqual(answer,"19:00")



    # def test_get_models_array(self):
    #     url = reverse('../static/pkls')
    #     response = self.client.get(url, {"lineid":"1","direction":"1"}, **{'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest'})
    #     self.assertEqual(response.status_code, 200)

    

        
    # def test_Stops_view(self):
    #     url = reverse('get')
    #     response = self.logged_in_client.get(url, {"routeId": "60-L59-d12-1","serviceId":"3#1",
    #     "tripId":"12083.3.60-L59-d12-1.365.I","shapeId":"60-L59-d12-1.365.I",
    #     "tripheadsign":"Hazelhatch Station - River Forest","directionid":"1",
    #     "arrivaltime":"13:34:00","stopid":"8260DB007812","stopsequence":"1",
    #     "shapedisttraveled":"0","stopname":"Hazelhatch Station, stop 7812",
    #     "agencyId":"978","routeshortname":"L59","routelongname":"River Forest - Hazelhatch Station"}, **{'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest'})
    #     self.assertEqual(response.status_code, 200)

