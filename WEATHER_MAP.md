# Weather Map Project - Sheldon Pasciak

I developed this project using the following technologies:

- Bootstrap 5.x.x. - https://getbootstrap.com/
- Mapbox GL JS - https://docs.mapbox.com/mapbox-gl-js/api/
- OpenWeatherMap API - https://openweathermap.org/api
- Chart.js - https://www.chartjs.org/

## Project Requirements

A weather map that shows the current weather in the city the student lives in, and a five day
forecast for that city. The map should be interactive, and the user should be able to move the
marker to a different location, and the weather forecast should update to the new location.

Although the rubric mentions that only one marker is shown, I decided to implement additional features whereby following
that rubric requirement would not be in the best interests of this application's goals.

This is because I built a robust interface that allows the
user to search for a location, and then add that location to the map. The user can then click on the marker to see the
weather forecast for that location. The user can also remove the markers by using the HOME button. The user can also
drag
the marker to a new location, and the weather forecast will update to the new location.

The following images show all the features of the application and its related implementation.

![wm_interface.png](images%2Fwm_interface.png)
![wm_day_forecast_detail.png](images%2Fwm_day_forecast_detail.png)
![wm_forecast-detail.png](images%2Fwm_forecast-detail.png)
![wm_temperature-comparison.png](images%2Fwm_temperature-comparison.png)

# Weather Map Rubric

For each project aspect below, a grade of 0, 0.5, or 1 will be assigned. Each aspect represents
10% of the total possible grade.

0 - mostly incomplete or not present

0.5 - partially completed

1 - mostly or fully complete

- ___ Shows current weather in city student lives in
- ___ Shows at least four days of forecasts for city student lives in (total of five days including
  current weather)
- ___ Page includes map with a marker on the location that the weather is shown for
- ___ User may move the marker by dragging, or may click on the map to add a new marker, in
  which case the old marker should disappear. Only one marker should be on the map at any
  given moment.
- ___ Weather forecast updates when marker is moved or replaced.
- ___ Text input is present that allows user to search for a place, and the forecast updates to the
  place the user searched for. Note: marker updating to the place the user searches for is not
  required (it's a bonus)
- ___ Project is cohesively styled
- ___ Code is organized according to best practices. There is a css and a js folder, no css or js on
  the html page

Weather Map Rubric
Instructions

Output (70%)
Code Quality (30%)

___ Code is formatted consistently with comments and whitespace making it easy to understand
where each part of the code is

___ Effective use of functions to encapsulate code