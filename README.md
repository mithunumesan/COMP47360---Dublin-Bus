# Dublin Bus Django + React + MySQL App


<Background>
The aim of this project is to provide an alternate solution to traveling and commuting around Dublin with an emphasis on Dublin Bus, while also allowing the user access to other transportation options such as DART, Luas, and Go-Ahead. <br />
<br />



We aimed to create an application that is easy to navigate through its careful choice of features, while still allowing the user access to all elements they made need to choose the best method to get from two different points in Dublin. The Dublin bus time predictions are based off a random forest model trained on historical Dublin Bus data from 2018, while elements such as estimated walk time to a certain stop, transport methods other than Dublin bus and routes that do not exist in this historical data were taken from the Google’s Direction API. 



Our application has several core features such as a journey planner, route explorer, and weather information, while also allowing the user to create a profile. While an account is not necessary to use this application, this adds addition functionality such as the ability to save and use stored favourite routes.



Visit our Dublin Bus app [here](http://137.43.49.30/).

## Features

### Journey Planner

The user can enter a start point, destination and proposed travelling time, and bus routes and the time taken on each route will be displayed.

![Journey Planner](Dublinbusapp/static/img/JourneyPlanner.gif)

### Route Exploration

User will be able to search the bus route which they wish to travel and it will show all the stops of that route, with an option to change the direction as well. 

![Quantile Dot Plot](Dublinbusapp/static/img/RouteExploration.gif)

### Login 

Users will be able to create an account and log in to the website, where they will be led to a home page showing their favourite routes.

![Route Viewer](Dublinbusapp/static/img/Favourite-Routes.gif)

### Favourite Routes

Once a user is logged in, they will be able to see, delete and add to their favourite routes. If they go to the journey planning page, they will be able to select their favorite route and auto-fill it to the journey planner. 

![Real-time Updates](Dublinbusapp/static/img/Login.gif)

### Weather 

The current weather conditions, including the temperature, weather description and humidity are displayed on the weather page. In addition, predicted weather conditions for the next four days are displayed.

![Route Viewer](Dublinbusapp/static/img/Weather.gif)


## Technologies
- Python
- Django 4.0.5
- React
- MySQL
- HTML & CSS
- Jupyter Notebooks
- UCD VM
<Description>

## Installation

<Installation process>

* 1. Download our application  
* 2. on the root directory run the command:  
```
 pip install -r requirements.txt
```
* 3. run the command: 
```
 sudo apt install nodejs
 sudo apt install npm
```
* 4. install node and npm  
```
 cd frontend
 npm install --force
```   
* 5. back to root directory and start our application  
```
 cd ..
 python manage.py runserver
```