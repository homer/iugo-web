var Map = React.createClass({

  getDefaultProps : function() {
    return {
      trips: {
        "type":"FeatureCollection",
        "features": []
      }
    }
  },

  makeMap : function() {
    // Called after the component view is mounted. Listen for AJAX and Websocket events
    L.mapbox.accessToken = 'pk.eyJ1Ijoib3NlbnNveSIsImEiOiIyNDg2NmI1YTgxYWM0M2UwNTI0NTEyYTdmM2ExNmJjZiJ9.pYrzm0PRW7hj1uDmy9UeKA';
    var mapboxTiles = L.tileLayer(
      'https://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    });

    if(this.props.routes.length > 0) {
      var initLat = this.props.routes[0].attributes.location._latitude;
      var initLng = this.props.routes[0].attributes.location._longitude;
      var map = L.map('map')
                  .addLayer(mapboxTiles)
                  .setView([initLat,initLng], 13);

      var marker = L.marker([
        this.props.routes[this.props.routes.length-1].attributes.location._latitude,
        this.props.routes[this.props.routes.length-1].attributes.location._longitude
        ])
        .addTo(map)
        .bindPopup("<b>Hello IUGO!</b><br>I am a car.");

      console.log(this.props.trips.features);
      var layer = L.geoJson(this.props.trips.features, { color:"ff8c00", weight:3, opacity:0.7 });
      layer.addTo(map);
    }
  },

  makePolyline : function() {
    var path = {
      'type':'Feature',
      'properties': {},
      'geometry': {
        'type':'LineString',
        'coordinates' : []
      }
    };

    for(var i=0; i < this.props.routes.length-1; i++) {
      var a = [
        this.props.routes[i].attributes.location._latitude,
        this.props.routes[i].attributes.location._longitude
      ];
      path['geometry']['coordinates'].push(a);
    }

    this.props.trips.features = path;
  },

  render : function() {
    if(this.props.routes.length > 0) {
      this.makePolyline();
      this.makeMap();
    }
    return <div id='map'></div>;
  },


})
