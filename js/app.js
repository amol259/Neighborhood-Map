/*This file stores the method for creating the map.*/

var infowindow, map;
var markers = [];

function initMap() {
    /*Creates map*/
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.623245,
            lng: -122.411272
        },
        zoom: 16
    });

    var currentMarker = null
    infowindow = new google.maps.InfoWindow()
    /*Iterates over the restaurants array and creates a marker for each object*/
    for (i = 0; i < restaurants.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(restaurants[i].coordinates),
            animation: google.maps.Animation.DROP,
            map: map,
            id: restaurants[i].fourSquareVenueID,
            name: restaurants[i].name
        });
        /*Populates the markers array with each marker*/
        markers.push(marker);
        /*Animates the markers when clicked*/
        marker.addListener('click', (function(marker) {
            return function () {
                fsrequest(marker);
                /*Prevents more than one marker from being animated at a time*/
                if (currentMarker) currentMarker.setAnimation(null);
                currentMarker = marker;
                marker.setAnimation(google.maps.Animation.BOUNCE);
           }
       })(marker))
    }
    /*Calls the ViewModel method in knockoutfile.js*/
    ko.applyBindings(new ViewModel());
}

/*Google maps error handling */
function errorHandling() {
	alert("Google Maps has failed to load. Please try again.");
}
