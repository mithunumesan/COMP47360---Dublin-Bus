import time
from locust import HttpUser, task, between

auth_header = {
    'content-type': 'application/json',
    'Authorization':'Token 7952630b17f766ab721f3bfae50103f991616627'
    } 

class WebsiteUser(HttpUser):
    wait_time = between(1,5)

    @task 
    def stops(self):
        self.client.get(url="/api/Stops/")

    @task 
    def routes(self):
        self.client.get(url="/api/Routes/")

# userlist
    @task 
    def userList(self):
        self.client.get(url="/loginapi/users/")

# # new user creation
#     @task 
#     def routes(self):
#         self.client.post("/loginapi/users/", {"username": "testuser", "password": "secret"})

# favorites list 
    @task 
    def favoriteslist(self):
        self.client.get(url="/loginapi/favorites/")


    @task 
    def userid(self):
        self.client.request(
            method='GET',
            url="/loginapi/username/",
            headers=auth_header
            )


# authentication
    @task 
    def authentication(self):
        response =  self.client.post("/auth/", {"username":"Dublinbus1", "password":"Dublinbus1"})



# fetches favorite routes
    @task 
    def favoriteRoute(self):
        self.client.get(url="/loginapi/details/2/")

# self.client.post("/auth/", json={"username": "Dublinbus1", "password": "Dublinbus1"})
