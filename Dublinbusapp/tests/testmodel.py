from django.test import TestCase
from  Dublinbusapp.models import Stops,Routes
from django.conf import settings
from django.contrib.auth import get_user_model


User = get_user_model()

class UserTestCast(TestCase):

    def setUp(self): 
        user_a = User(username='ms', email='m.s@ucdconnect.ie')
        user_a_pw = 'password'
        self.user_a_pw = user_a_pw
        user_a.is_staff = True
        user_a.is_superuser = True
        user_a.set_password(user_a_pw)
        user_a.save()
        self.user_a = user_a
    
    def test_user_exists(self):
        user_count = User.objects.all().count()
        self.assertEqual(user_count, 1) # ==
        self.assertNotEqual(user_count, 0) # !=

 

    def test_user_password(self):
        user_a = User.objects.get(username="ms")
        self.assertTrue(
            user_a.check_password(self.user_a_pw)
        )
    
    # def test_login_url(self):
    #     # login_url = "/login/"
    #     # self.assertEqual(settings.LOGIN_URL, login_url)
    #     login_url = settings.LOGIN_URL
    #     # python requests - manage.py runserver
    #     # self.client.get, self.client.post
    #     # response = self.client.post(url, {}, follow=True)
    #     data = {"username": "ms", "password": "password"}
    #     response = self.client.post(login_url, data, follow=True)
    #     # print(dir(response))
    #     # print(response.request)
    #     status_code = response.status_code
    #     redirect_path = response.request.get("PATH_INFO")
    #     self.assertEqual(redirect_path, settings.LOGIN_REDIRECT_URL)
    #     self.assertEqual(status_code, 200)

# class ModelTest(TestCase):



    # def create_whatever(self,stopid="8240DB007348", stopname="Zone 15, stop 7348", latitude = "53.4277",
    # longitude="-6.24161",agencyLineNum ="03,331;978,41;03,102"):
    #     return Stops.objects.create(
    #         stopid=stopid,
    #         stopname=stopname , 
    #         latitude = latitude,
    #         longitude=longitude,
    #         agencyLineNum =agencyLineNum
            
    #     )

    # def test_whatever_creation(self):
    #     tStop = self.create_whatever()
    #     self.assertTrue(isinstance(tStop, Stops))
    #     self.assertEqual(tStop.__unicode__(), tStop.title)






# def setUp(cls):
        # Stops.objects.create(
        #     stopid="8240DB007348",
        #     stopname="Zone 15, stop 7348",
        #     latitude = "53.4277",
        #     longitude="-6.24161",
        #     agencyLineNum ="03,331;978,41;03,102"
            
        # )



#         Routes.objects.create(
#             routeid="17-120-1-cm1-1",
#             routeshortname="120-1",
#             routelongname = "Edenderry Shopping Centre - University College Dublin",
#             shapeidlist="17-120-1-cm1-1.107.I,17-120-1-cm1-1.108.I",
           
#         )

#      def test_max_length_stops(self):
#          stops = Stops.objects.get(stopid="8220B1000401")
#          max_length = stops._meta.get_field("stopid").max_length
#          self.assertEquals(max_length, 45)

#     def test_max_length_route(self):
#         routes = Routes.objects.get(routeid="17-120-1-cm1-1")
#         max_length = routes._meta.get_field("routeid").max_length
#         self.assertEquals(max_length, 45)