var infowindow, map;
var markers = [];
function initMap() {
/* Location Data used in the project is stored here*/
 /*Creates map*/
 map = new google.maps.Map(document.getElementById('map'), {
  center: {
      lat:  40.7413549, 
      lng: -73.9980244
  },
  zoom: 13
});

var  locations = [
    {
      title: "Sheraton Tribeca New York Hotel",
      location: {
        lat:40.720658,
        lng:-74.004486
      }
    },  {
      title: 'Conrad New York Hotel',
      location: {
        lat: 40.715005,
        lng: -74.015214
      }
    }, {
      title: 'Park Central NYC',
      location: {
        lat: 40.782420,
        lng: -73.996831
      }
    }, {
      title: 'Hotel 50 Bowery',
      location: {
        lat: 40.716002,
        lng: -73.9924972
      }
    }, {
      title: 'The ludlow Hotel',
      location: {
        lat: 40.721789,
        lng: -73.987220
      }
    }
  ];
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    bounds.extend(markers[i].position);
  }
  // Extend the boundaries of the map for each marker
  map.fitBounds(bounds);
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick',function(){
      infowindow.setMarker = null;
    });
  }
}

   
//     var currentMarker = null
//     infowindow = new google.maps.InfoWindow()
//  // Style the markers a bit. This will be our listing marker icon.
//  var defaultIcon = makeMarkerIcon('0091ff');

//  // Create a "highlighted location" marker color for when the user
//  // mouses over the marker.
//  var highlightedIcon = makeMarkerIcon('FFFF24');

//  var largeInfowindow = new google.maps.InfoWindow();




    /*Iterates over the restaurants array and creates a marker for each object*/
//     for (i = 0; i < restaurants.length; i++) {
//         var marker = new google.maps.Marker({
//             position: new google.maps.LatLng(restaurants[i].coordinates),
//             animation: google.maps.Animation.DROP,
//             map: map,
//             id: restaurants[i].fourSquareVenueID,
//             name: restaurants[i].name
//         });
//         /*Populates the markers array with each marker*/
//         markers.push(marker);
//         /*Animates the markers when clicked*/
//         marker.addListener('click', (function(marker) {
//             return function () {
//                 fsrequest(marker);
//                 /*Prevents more than one marker from being animated at a time*/
//                 if (currentMarker) currentMarker.setAnimation(null);
//                 currentMarker = marker;
//                 marker.setAnimation(google.maps.Animation.BOUNCE);
//            }
//        })(marker))
//     }
//     /*Calls the ViewModel method in knockoutfile.js*/
//     ko.applyBindings(new ViewModel());
// }

/*Google maps error handling */
function errorHandling() {
	alert("Google Maps has failed to load. Please try again.");
}
