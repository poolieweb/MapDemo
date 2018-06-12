

    // Main Map
    var map = L.Wrld.map("map", "18ae0d05d0aafb494039a95baab0377f", {
        center: [53.5339, -2.2552],
        zoom: 16
    });

    //Static location of the GPS device (Demo only in this POC)
    L.circle([53.5339, -2.2552], { color: 'red', radius: 50.0 }).addTo(map);

    var myIconMarker = L.icon({
        iconUrl: './images/map-marker.png',
        iconSize: [128, 128],
        iconAnchor: [64, 128],
        popupAnchor: [-3, -76],
        shadowUrl: './images/shadow.png',
        shadowSize: [128, 128],
        shadowAnchor: [22, 94]
    });
    L.marker([53.5339, -2.2552], { icon: myIconMarker }).addTo(map);

    // Demo of image at a given location.
    var myIcon = L.icon({
        iconUrl: './images/icon1.png',
        iconSize: [128, 128],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: './images/shadow.png',
        shadowSize: [128, 128],
        shadowAnchor: [22, 94]
    });
    L.marker([53.530568102300002, -2.2654759365], { icon: myIcon }).addTo(map);

    // Polyline coords.
    var polylinePoints = [
        [53.5366819105, -2.2435607329],
        [53.535936290199999, -2.2455556139],
        [53.535724045899997, -2.2503825216],
        [53.536216186600001, -2.2514415916],
        [53.5359853394, -2.2543446692],
        [53.538742702599997, -2.257416715],
        [53.538446755800003, -2.2591878675],
        [53.538554514399998, -2.2613009788],
        [53.5376983158, -2.2623519144],
        [53.537691660199997, -2.2653696038],
        [53.5362329011, -2.2645306376],
        [53.535486256799999, -2.2668268855],
        [53.534972367500004, -2.2655034824],
        [53.533941386800002, -2.2642900484],
        [53.530568102300002, -2.2654759365],
        [53.529693498500002, -2.2646784613],
        [53.5283583756, -2.2586737166],
        [53.529415804899998, -2.2580767328],
        [53.5301581529, -2.2577040972],
        [53.531329549799999, -2.256353435],
        [53.5323204408, -2.2553410651],
        [53.532595139, -2.2529665429],
        [53.532934826, -2.2517238947],
        [53.532802456600002, -2.2505538756],
        [53.535611139399997, -2.2506458937],
        [53.535867793, -2.2460832966],
        [53.536726160299999, -2.2439004729]
    ];

    var polyline = L.polyline(polylinePoints, { weight: 5 }).addTo(map);


      // Demo of image and area
    var rectangle = L.rectangle([[53.53515, -2.26199], [53.53762, -2.2573]],{color:'red'}).addTo(map);

    map.on("click", function(e) {
        pixelPosition = e.layerPoint;
        latLng = map.layerPointToLatLng(pixelPosition);
        console.log("Pixel position = "+pixelPosition + "\nLatLng = "+latLng);
      });

  
    var myStageIcon = L.icon({
        iconUrl: './images/parklife.png',
        iconSize: [400, 160],
        iconAnchor: [200, 80],
        popupAnchor: [-3, -76],
        shadowUrl: './images/shadow.png',
        shadowSize: [128, 128],
        shadowAnchor: [22, 94]
    });

    L.marker([53.53634, -2.25992], { icon: myStageIcon }).addTo(map);

    var poiApi = new WrldPoiApi("18ae0d05d0aafb494039a95baab0377f");
    var markers = [];

    function displaySearchResults(success, results) {
        map.closePopup();
        if (success) {
            results.forEach(function(result) {
                var marker = L.marker([result["lat"], result["lon"]], {
                   title: result["title"],
                   iconKey: result["tags"]
                }).addTo(map);

                markers.push(marker);
            })
        }
        else {
            map.openPopup("POI API query failed!", map.getCenter());
        }
    }

    function searchPoisAroundClick(event) {
        markers.forEach(function(marker) { marker.remove(); });
        map.openPopup("Searching...", event.latlng);

        var callback = displaySearchResults;
        var options = { range: 500, number: 5 };
        poiApi.searchTags([], event.latlng, callback, options);
    };

    map.on("click", searchPoisAroundClick);
    
    // Pan Map
    setTimeout(function () {

        var interval = 5500; // how much time should the delay between two iterations be (in milliseconds)?
        var promise = Promise.resolve();
        polylinePoints.forEach(function (el) {
          promise = promise.then(function () {
            console.log(el);
            panView(el[0],el[1])
            return new Promise(function (resolve) {
              setTimeout(resolve, interval);
            });
          });
        });
        
        promise.then(function () {
          console.log('Loop finished.');
        });

    }, 8000);

  



    function panView(lat,lng) {
        map.setView([lat, lng], 18, {
            headingDegrees: 270,
            animate: true,
            durationSeconds: 5
        });
    };