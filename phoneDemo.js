
var map = L.Wrld.map("map", "18ae0d05d0aafb494039a95baab0377f", {
    center: [53.5339, -2.2552],
    zoom: 16
});

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
} else { 
    alert("Geolocation is not supported by this browser.");
}
    
function showPosition(position) {
    map.setView([position.coords.latitude, position.coords.longitude], 50, {
        animate: false
    });
}