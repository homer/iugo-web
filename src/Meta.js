var Meta = React.createClass({
  renderMeta : function() {
    var start = moment(this.props.meta.startTime).format("dddd, MMMM Do YYYY, h:mm:ss a");
    var end = moment(this.props.meta.endTime).format("dddd, MMMM Do YYYY, h:mm:ss a");
    var distance = parseFloat(this.props.meta.distance).toFixed(1);
    var speed = parseFloat(this.props.meta.speed).toFixed(0);
    var duration = prettyTime(this.props.meta.diff);

    return <table className="table">
      <tbody>
        <tr>
          <td>Trip Start Time:</td>
          <td>{ start }</td>
        </tr>
        <tr>
          <td>Trip End Time:</td>
          <td>{ end }</td>
        </tr>
        <tr>
          <td>Distance Traveled:</td>
          <td>{ distance } km</td>
        </tr>
        <tr>
          <td>Duration:</td>
          <td>{ duration }</td>
        </tr>
        <tr>
          <td>Ave. Speed:</td>
          <td>{ speed } km/hr.</td>
        </tr>
      </tbody>
    </table>;
  },

  render : function() {
    if(this.props.meta) {
      return this.renderMeta();
    } else {
      return null;
    }
  }

});