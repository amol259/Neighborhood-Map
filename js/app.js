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
      title: "Sheraton Tribeca New York ",
      location: {
        lat:40.720658,
        lng:-74.004486
      },
      fourSquareVenueID: "4c2caafb8ef52d7f823a33ba",
    },  {
      title: 'Conrad New York',
      location: {
        lat: 40.715005,
        lng: -74.015214
      },
      fourSquareVenueID: "4f22ca77e4b0ed3396a83a05",

    }, {
      title: 'Park Central NYC',
      location: {
        lat: 40.764720,
        lng: -73.981180
      },
      fourSquareVenueID: "parkcentralny",

    }, {
      title: 'Hotel 50 Bowery',
      location: {
        lat: 40.716002,
        lng: -73.9924972
      },
      fourSquareVenueID: "578692f4498e1054905dbde7",

    }, {
      title: 'The ludlow Hotel',
      location: {
        lat: 40.721789,
        lng: -73.987220
      },
      fourSquareVenueID: "536020eb11d2ce653fb711d0",
    }
  ];
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();


// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
// function populateInfoWindow(marker, infowindow) {
//   // Check to make sure the infowindow is not already opened on this marker.
//   if (infowindow.marker != marker) {
//     infowindow.marker = marker;
//     infowindow.setContent('<div>' + marker.title + '</div>');
//     infowindow.open(map, marker);
//     // Make sure the marker property is cleared if the infowindow is closed.
//     infowindow.addListener('closeclick',function(){
//       infowindow.setMarker = null;
//     });
//   }

//   ko.applyBindings(new ViewModel());

// }


//     var currentMarker = null
//     infowindow = new google.maps.InfoWindow()
//  // Style the markers a bit. This will be our listing marker icon.
//  var defaultIcon = makeMarkerIcon('0091ff');

//  // Create a "highlighted location" marker color for when the user
//  // mouses over the marker.
//  var highlightedIcon = makeMarkerIcon('FFFF24');

//  var largeInfowindow = new google.maps.InfoWindow();




    /*Iterates over the restaurants array and creates a marker for each object*/
    for (i = 0; i < locations.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].location),
            animation: google.maps.Animation.DROP,
            map: map,
            id: locations[i].fourSquareVenueID,
            title: locations[i].title
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
