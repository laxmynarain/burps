function parseQueryString(qs) {
  var parsed = {};
  if (qs == '') {
    return parsed;
  }

  qs = qs.split('&');
  for (var i = 0; i < qs.length; i++) {
    qs[i] = qs[i].split('=');
    parsed[qs[i][0]] = qs[i][1];
  }

  return parsed;
}

window.addEventListener('load', function() {
  // Enables a newer UI look in Google Maps.
  google.maps.visualRefresh = true;

  var sfCoords = new google.maps.LatLng(37.7833, -122.4167);
  var mapOptions = {
    center: sfCoords,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl: false,
    zoom: 15
  };
  var map = new google.maps.Map(document.querySelector('#map-canvas'),
                                mapOptions);
  var styles = [
  {
    stylers: [
      //{ hue: "#00ffe6" },
      { hue: "#000006" },
      { saturation: 10 }
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { lightness: 100 },
      { visibility: "simplified" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
  ];
  map.setOptions({styles: styles});
  var marker = new google.maps.Marker({
      position: sfCoords,
      map: map,
      title: 'San Francisco'
  });

  var infowindow = new google.maps.InfoWindow({
      content: "City of San Francisco"
  });
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  var input = document.querySelector('#query>input');
  var searchbox = new google.maps.places.SearchBox(input);
  searchbox.bindTo('bounds', map);
  input.focus();

  var app = new FoodTruckApp(map, searchbox, navigator.geolocation, console);
  app.autoposition();

  function handleHashChange() {
    var hashQuery = parseQueryString(location.hash.substring(1));
    app.load(hashQuery['now']);
  }

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
});
