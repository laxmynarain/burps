burps
=====
##Food Trucks in San Francisco. __[Check it out!](http://burps.herokuapp.com)__

This project marks the list of active food trucks operating in San Francisco. I am a beginner at web technologies. I figured this was the easiest way to implementation this project.This project is written primarily in Python and HTML/CSS/JS.It also uses the google maps API to render visualization for easy navigation.

##Philosophy:
I am a good coder but a beginner at web programming. I just wanted to try out my skills at web programming. Since, I am a beginner I used the simlest implementation that I could think of. I think, programming is not about having knowledge of multiple tools and techniques but it is about being able to think "Computer - sciency" and using the right tools to that end. On the way you may have to learn a lots of tool and tricks, and there is no harm there. :). It's part of the learning and fun. And that's what programming should be - FUN. 

This project was done just to prove that you don't need experience with web programming to provide good web sites. Here is my background. __[My Linkedin](http:linkedin.com/in/lsadagopan/)__ 

Also: This was part of a coding challenge. I'm glad I could complete it in time!

## Technology Choices
1. I probably would have explored backend js choices, added good looking twitter bootstrap or maybe even done some load testing. But, it's been a very hectic week and the technology choices came down to getting a prototype up and running ASAP and python and simple js did the trick.
2. If I had more time:
    1. I would have researched about better ways to write the same project.
    2. I would have provided ways to integrate into mobile systems (provide maps directions, yelp ratings, transportation choices, etc...)
    3. Written a more comprehensive unit test module.

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
I did some user testing by asking some of my friends to adopt it. Here are a few that came up. I intend to fix them.

1. The markers don't show up after 9pm - I have to figure out what's causing this. Obviously some issue with google maps api service. Maybe start by finding out if anyone else is facing these issues on their site.
2. Once geolocation is enabled outside of sanfrancisco, some users report that food truck search near san francisco doesn't automatically pan. Others see it fine. Could be that the platform/browser is not supported by Google maps. I need to loook into it.

Enjoy the app.
