burps
=====
##Food Trucks in San Francisco. __[Check it out!](http://burps.herokuapp.com)__

#### This project marks the list of active food trucks operating in San Francisco. I am a beginner at web technologies. I figured this was the easiest way to implementation this project.This project is written primarily in Python and HTML/CSS/JS.It also uses the google maps API to render visualization for easy navigation.

## Technologies

### Backend

- Python

### Frontend

- Google Maps
- Java Script

## Spec

1. Find food trucks nearby 
2. On click provides info bubble with timings, description.
3. Pan to correct position on ma by entering address in the searcch bar
4. Automatic geo-location enabled. Map pans to your location to show the food trucks.

## Description:

1. A truck script is written to take care of parsing the locations and operating hours (appearances) of food trucks in SF. This parsing is done on a copy of json data obtained from publicly available data. https://data.sfgov.org
2. Here is the top level idea of the project:
    1. A server.py script serves the webpage.
    2. A truck.py script parses location and timing data for food trucks.
    3. index.html serves the frontpage of the website.
    4. main.js has eventhandlers for google maps api.
    5. food_truck_app.js has google maps api to geolocate and provide markers for the food trucks.
3. The App is deployed on heroku using a free account.
4. Two unit_tests are added to make sure that location parsing  and appearance parsing works fine.

## List of known bugs:
# I did some user testing by asking some of my friends to adopt it. Here are a few that came up. I intend to fix them.

1. The markers don't show up after 9pm - I have to figure out what's causing this. Obviously some issue with google maps api service. Maybe start by finding out if anyone else is facing these issues on their site.
2. Once geolocation is enabled outside of sanfrancisco, some users report that food truck search near san francisco doesn't automatically pan. Others see it fine. Could be that the platform/browser is not supported by Google maps. I need to loook into it.

Enjoy the app and give me your feedback. [laxmynarain at gmail dot com]
