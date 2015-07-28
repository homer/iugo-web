var MapApp = React.createClass({

  getInitialState : function() {
    return {
      routePoints: [],
      meta : {}
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
        self.setMetaData();
      }
    });
  },

  setMetaData : function() {
    var startTime = new Date(this.state.routePoints[0].createdAt);
    var endTime = new Date(this.state.routePoints[this.state.routePoints.length - 1].createdAt);
    var distance = computeTotalDistance(this.state.routePoints);
    var diff = diffInSeconds(endTime, startTime);

    this.setState({ meta : {
      startTime : startTime,
      endTime : endTime,
      distance : computeTotalDistance(this.state.routePoints),
      diff : diffInSeconds(endTime, startTime),
      speed : speedPerHour(distance, diff)
    }});
  },

  render : function() {
    var createItem = function(item, idx) {
      return <li className="list-group-item">{ idx } - { item.attributes.location._latitude } - { item.attributes.location._longitude }</li>;
    };

    return <div>
      <h1>IUGO Sample Trip</h1>
      <Meta meta={this.state.meta} />
      <Map routes={this.state.routePoints} />
    </div>;
  }
});