/**
 * Top-level application.
 */
function FoodTruckApp(map, searchbox, geolocator, console, params) {
  this._map = map;
  this._searchbox = searchbox;
  this._geolocator = geolocator;
  this._console = console;
  this._params = params;

  this._currentMarkers = {};
  this._activeInfoWindow = null;
  this._getClosestRequest = null;
  google.maps.event.addListener(searchbox, 'places_changed',
                                this._handlePlacesChanged.bind(this));
}

FoodTruckApp.prototype.autoposition = function() {
  if (!this._geolocator) {
    this._console.log('No geolocator. Perhaps this browser doesn\'t support ' +
                      'Geolocation');
    return;
  }

  this._geolocator.getCurrentPosition(function(position) {
    var pos = new google.maps.LatLng(position.coords.latitude,
                                     position.coords.longitude);
    this._map.setCenter(pos);
//    var marker2 = new google.maps.Marker({
//      position: pos,
//      map: this._map,
//      title: 'Current Location'
//  });
//  var infowindow2 = new google.maps.InfoWindow({
//      content: "City of Current Location"
//  });
  
//  google.maps.event.addListener(marker2, 'click', function() {
//    infowindow2.open(this._map,marker2);
//  });


  }.bind(this), function() {
    this._console.log('User denied access to geolocation.');
    this._handleCenterChanged();
  }.bind(this));
};

FoodTruckApp.prototype.load = function(opt_now) {
  this._clearMarkers();
  
  if (this._getClosestRequest != null) {
    this._getClosestRequest.abort();
  }

  var url = "/get_open";
  if (opt_now) {
    url += "?now=" + opt_now;
  }

  this._getClosestRequest = new XMLHttpRequest();
  this._getClosestRequest.open("GET", url, true);
  this._getClosestRequest.onload = this._handleGetOpen.bind(this);
  this._getClosestRequest.send(null);
};

FoodTruckApp.prototype._handleGetOpen = function() {
  if (this._getClosestRequest.status != 200) {
    return;
  }

  console.log(this._getClosestRequest.responseText)
  var data = JSON.parse(this._getClosestRequest.responseText);
  this._getClosestRequest = null;
  data.forEach(function(item) {
    if (this._currentMarkers[item.uid])
      return;
	console.log(item)
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(item.location.geopos.lat,
                                       item.location.geopos.lon),
      map: this._map,
      title: item.location.name + '\n\n' + item.location.description
    });

    marker.setAnimation(google.maps.Animation.DROP);
    this._currentMarkers[item.uid] = marker;

    google.maps.event.addListener(
        marker, 'click',
        this._handleMarkerClick.bind(this, marker, item));
  }.bind(this));
};

FoodTruckApp.prototype._clearMarkers = function() {
  for (var uid in this._currentMarkers) {
    this._currentMarkers[uid].setMap(null);
  }
  this._currentMarkers = {};
};

FoodTruckApp.prototype._handlePlacesChanged = function() {
  var places = this._searchbox.getPlaces();
  if (!places || !places.length) {
    return;
  }

  var place = places.shift();
  if (place.geometry.viewport) {
    this._map.fitBounds(place.geometry.viewport);
  } else {
    this._map.setCenter(place.geometry.location);
  }
};

FoodTruckApp.prototype._handleMarkerClick = function(marker, item) {
  // The maps API allows raw HTML to be used for the content property, but we
  // don't do that here because it could lead to XSS if the data from the city
  // is not carefully escaped.
  var content = document.createElement('div');
  content.className = 'infobubble-content';
  var heading = document.createElement('h1');
  heading.textContent = item.location.name;
  var descriptionElm = document.createElement('p');
  descriptionElm.textContent = item.location.description;
  var hours = document.createElement('b');
  hours.textContent = this._formatTime(item.start_time) + ' - ' +
    this._formatTime(item.end_time);
  content.appendChild(heading);
  content.appendChild(descriptionElm);
  content.appendChild(hours);

  var infoWindow = new google.maps.InfoWindow({ content: content });
  if (this._activeInfoWindow) {
    this._activeInfoWindow.close();
  }

  infoWindow.open(this._map, marker);
  this._activeInfoWindow = infoWindow;
};

FoodTruckApp.prototype._formatTime = function(time_tuple) {
  var hours = time_tuple[0];
  var minutes = time_tuple[1];

  var am = true;
  if (hours > 11)
    am = false;
  if (hours > 12)
    hours -= 12;
  if (hours == 0)
    hours = 12;

  minutes = String(minutes);
  minutes = "00".substr(0, 2 - minutes.length) + minutes;

  var period = am ? "AM" : "PM";

  return hours + ":" + minutes + " " + period;
};
