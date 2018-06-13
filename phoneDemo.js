
    // Main Map
    var map = L.Wrld.map("map", "18ae0d05d0aafb494039a95baab0377f", {
        center: [53.5339, -2.2552],
        zoom: 16
    });


window.onload = function() {
    var startPos;
    var geoSuccess = function(position) {
      startPos = position;
      document.getElementById('startLat').innerHTML = startPos.coords.latitude;
      document.getElementById('startLon').innerHTML = startPos.coords.longitude;


    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  };