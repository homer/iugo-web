var MapApp = React.createClass({

  getInitialState : function() {
    return {
      routePoints: [],
      meta : {}
    }
  },

  componentWillMount : function() {
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
        self.getMetaData();
      }
    });
  },

  getMetaData : function() {
    if(this.state.routePoints.length > 0) {
      var startTime = new Date(this.state.routePoints[0].createdAt);
      var endTime = new Date(this.state.routePoints[this.state.routePoints.length - 1].createdAt);
      var distance = computeTotalDistance(this.state.routePoints);
      var diff = diffInSeconds(endTime, startTime);

      var meta = {
        startTime : startTime,
        endTime : endTime,
        distance : computeTotalDistance(this.state.routePoints),
        diff : diffInSeconds(endTime, startTime),
        speed : speedPerHour(distance, diff)
      };

      return meta;
    } else {
      return null;
    }
  },

  render : function() {
    var createItem = function(item, idx) {
      return <li className="list-group-item">{ idx } - { item.attributes.location._latitude } - { item.attributes.location._longitude }</li>;
    };

    return <div>
      <h1>IUGO Sample Trip</h1>
      <Meta meta={ this.getMetaData() } />
      <Map routes={ this.state.routePoints } />
    </div>;
  }
});