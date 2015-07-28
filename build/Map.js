var Map = React.createClass({displayName: "Map",

  makeMap : function() {
    if(this.props.routes.length > 0) {
      // Called after the component view is mounted. Listen for AJAX and Websocket events
      L.mapbox.accessToken = 'pk.eyJ1Ijoib3NlbnNveSIsImEiOiIyNDg2NmI1YTgxYWM0M2UwNTI0NTEyYTdmM2ExNmJjZiJ9.pYrzm0PRW7hj1uDmy9UeKA';
      var mapboxTiles = L.tileLayer(
        'https://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
      });

      var initLat = this.props.routes[0].attributes.location._latitude;
      var initLng = this.props.routes[0].attributes.location._longitude;

      var latlngs = this.props.routes.map(function(coordGroup){
        var a = [];
        a.push(coordGroup.attributes.location._latitude);
        a.push(coordGroup.attributes.location._longitude);
        return a;
      });
      console.log(latlngs);

      var map = L.map('map')
                  .addLayer(mapboxTiles)
                  .setView([initLat,initLng], 13);

      var marker = L.marker([
        this.props.routes[this.props.routes.length-1].attributes.location._latitude,
        this.props.routes[this.props.routes.length-1].attributes.location._longitude
        ])
        .addTo(map)
        .bindPopup("<b>Hello IUGO!</b><br>I am a car.");

      var polyline_options = { color: '#ff0000' };
      // {color:'#ff0000', weight:1, opacity:1 }
      var polylnie = L.polyline(latlngs, polyline_options).addTo(map);

    }

  },

  render : function() {
    if(this.props.routes.length > 0) {
      this.makeMap();
    }

    return React.createElement("div", {id: "map"});
  },


})
