var Map = React.createClass({displayName: "Map",

  componentDidMount : function() {

    // Called after the component view is mounted. Listen for AJAX and Websocket events
    L.mapbox.accessToken = 'pk.eyJ1Ijoib3NlbnNveSIsImEiOiIyNDg2NmI1YTgxYWM0M2UwNTI0NTEyYTdmM2ExNmJjZiJ9.pYrzm0PRW7hj1uDmy9UeKA';
    var mapboxTiles = L.tileLayer(
      'https://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    });

    var initLat = 47.558272;
    var initLng = -122.371553;
    var map = L.map('map')
                .addLayer(mapboxTiles)
                .setView([initLat,initLng], 13);

    var marker = L.marker([initLat,initLng]).addTo(map);
    marker.bindPopup("<b>Hello IUGO!</b><br>I am a car.");
  },

  render : function() {
    return React.createElement("div", {id: "map"});
  },


})
