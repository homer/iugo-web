function computeDistanceBetweenPoints(lat1, lng1, lat2, lng2) {
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
}

function computeTotalDistance(aRoutes){
    var distance = 0;
    for(var i=0; i <= aRoutes.length - 2; i++) {
      var lat1 = aRoutes[i].attributes.location._latitude;
      var lng1 = aRoutes[i].attributes.location._longitude;
      var lat2 = aRoutes[i+1].attributes.location._latitude;
      var lng2 = aRoutes[i+1].attributes.location._longitude;

      d = computeDistanceBetweenPoints(lat1, lng1, lat2, lng2);
      distance += d;
    }
    return distance;
}

function diffInSeconds(end, start) {
  var tEnd = moment(end);
  var tStart = moment(start);
  var diff = tEnd.diff(tStart, 'seconds');
  return diff;
}

function speedPerHour(distance, seconds) {
  return ( (3600 * distance) / seconds);
}

function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function prettyTime(seconds) {
  var hrs = Math.floor(seconds/3600);

  var mins = seconds - (hrs * 3600);
  mins = Math.floor(mins/60);

  var secs = seconds - (hrs * 3600) - (mins * 60);

  var prettyTime = pad(hrs,2) + ":" + pad(mins,2) + ":" + pad(secs,2);

  return prettyTime;
}

Number.prototype.toRad = function(){ return this * Math.PI/180 };