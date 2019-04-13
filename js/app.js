var map;
var markers = [];
var infowindow;
function initMap() {
  //Creates map and sets coordinates for where it is centered at
 map = new google.maps.Map(document.getElementById('map'), {
  center: {
      lat:  40.7413549, 
      lng: -73.9980244
  },
  zoom: 13
});

//Array of locations of the top hotels in New York User sees
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

  var currentMarker = null;
  infowindow =  new google.maps.InfoWindow();

//Iterates through array and sets the marker from locations array
    for (i = 0; i < locations.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].location),
            animation: google.maps.Animation.DROP,
            map: map,
            id: locations[i].fourSquareVenueID,
            title: locations[i].title
        });
        //adds the marker into the markers array
        markers.push(marker);
        //When clicking on a makrker it returns the 4square request
        marker.addListener('click', (function(marker) {
          return function () {
              //api call to 4square
              fourSquarerequest(marker);
              //Only Set animation if there is a marker
              if (currentMarker) {
                  currentMarker.setAnimation(null)
              } else {
              currentMarker = marker;
              marker.setAnimation(google.maps.Animation.BOUNCE);
              }         
          }
      })(marker))
    }

    //Calls view model function in model.js file
    ko.applyBindings(new ViewModel());
}

function errorHandling() {
	alert("Google Maps has failed to load. Please try again.");
}

function fourSquarerequest (marker) {
  var apiURL = 'https://api.foursquare.com/v2/venues/';
  var foursquareClientID = 'ERNZZPCCBVKVSFQL14JBI5FEV3RGYXGIBSMX0RP5QGF32B1V'
  var foursquareClientSecret ='UEC2IOYE01WY1QJ3MKCWMS024TXPVJPAURRCJYDWKNDORRVD';
  var foursquareVersion = '20170115';
  var venueId = marker.id;
  var foursquareURL = apiURL + venueId + '?client_id=' + foursquareClientID +  '&client_secret=' + foursquareClientSecret +'&v=' + foursquareVersion;

  $.ajax({
    url: foursquareURL,
    success: function(data) {
      //Grab the following from the api response
      var title =  data.response.venue.name;
      var phone = data.response.venue.contact.phone;
      //sets content in the information window
      infowindow.setContent(title + ";   " + "Phone Number: " + phone.toString());
      infowindow.open(map, marker);
      },
      error: function(error) {
        alert("Error, Four Square api data could not display")
    }
  });
};

