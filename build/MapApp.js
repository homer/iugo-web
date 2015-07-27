var MapApp = React.createClass({displayName: "MapApp",

  getInitialState : function() {
    return {
      routePoints: []
    }
  },

  componentDidMount : function() {
    this.getGeoPoints();
  },

  getGeoPoints : function() {
    var self = this;
    var GPSPointsObj = Parse.Object.extend("GPSPoints");

    var query = new Parse.Query(GPSPointsObj);
    var qObj = {
      '__type': 'Pointer',
      'className': 'Route',
      'objectId': 'plkc9x4wD5'
    }
    query.equalTo("forRoute", qObj);
    query.limit(1000);
    query.find({
      success: function(data) {
        self.setState({ routePoints: data });
      }
    });
  },

  render : function() {
    var createItem = function(item, idx) {
      return React.createElement("li", {className: "list-group-item"},  idx, " - ",  item.attributes.location._latitude, " - ",  item.attributes.location._longitude);
    };
    return React.createElement("div", null, 
      React.createElement(Map, {routes: this.state.routePoints}), 
      React.createElement("ul", {className: "list-group"},  this.state.routePoints.map(createItem) )
    );
  }
});