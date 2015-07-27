var Map = React.createClass({

  render : function() {
    var distance = 0;
    for(var i=0; i <= this.props.routes.length - 2; i++) {
      if(i == 0) {
        this.props.startTime = new Date(this.props.routes[i].createdAt);
      }
      if(i == this.props.routes.length - 2) {
        this.props.endTime = new Date(this.props.routes[i].createdAt);
      }
      var lat1 = this.props.routes[i].attributes.location._latitude;
      var lng1 = this.props.routes[i].attributes.location._longitude;
      var lat2 = this.props.routes[i+1].attributes.location._latitude;
      var lng2 = this.props.routes[i+1].attributes.location._longitude;

      d = this.computeDistanceBetweenPoints(lat1, lng1, lat2, lng2);
      distance += d;
    }
    return <div id="map"></div>;
  },

  computeDistanceBetweenPoints : function(lat1, lng1, lat2, lng2) {
    var R = 6371;

    var x1 = lat2-lat1;
    var dLat = x1.toRad();
    var x2 = lng2-lng1;
    var dLon = x2.toRad();

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d;
  },

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
  }
})

Number.prototype.toRad = function(){ return this * Math.PI/180 };
