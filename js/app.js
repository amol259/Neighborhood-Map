var map;
var markers = [];
var infowindow;

//Array of locations of the top hotels in New York User
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
    title: 'Hotel Indigo Lower East Side',
    location: {
      lat: 40.724030,
      lng: -73.987610
    },
    fourSquareVenueID: "54c0151d498e4c827296cd41",

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

function initMap() {
  //Creates map and sets coordinates for centering
 map = new google.maps.Map(document.getElementById('map'), {
  center: {
      lat:  40.7413549, 
      lng: -73.9980244
  },
  zoom: 13
});

//Iterates through array and sets the markers from locations array
    for (i = 0; i < locations.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].location),
            animation: google.maps.Animation.DROP,
            map: map,
            id: locations[i].fourSquareVenueID,
            title: locations[i].title
        });
        markers.push(marker);

        marker.addListener('click', (function(marker) {
          return function () {
              //api call to 4square
              fourSquarerequest(marker);
              //Only Set animation if a marker exists
              if (marker === null) {
                  currentMarker.setAnimation(null)
              } else {
              //Bounce Once when clicked on
              marker.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(function(){ marker.setAnimation(null); }, 750);  

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
  //create infowindow
  infowindow =  new google.maps.InfoWindow();

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

var Place = function(data) {
  this.title = ko.observable(data.title);
}

function ViewModel() {
  var self = this;
  //array for locations
  self.placeList = ko.observableArray([]);
  //query used to filter
  self.query = ko.observable('');

  //copy markers array into places array
  for(var i = 0; i < markers.length; i++) {
    self.placeList.push(markers[i])
  }
  self.listedItem = function(marker) {
     google.maps.event.trigger(marker, 'click');
  }
  self.filteredPlaces = ko.computed(function() {
    //if nothing is inputted show whole list
    if (!self.query()) {
      return self.placeList();
    } else {
      //else filter based on query
      return self.placeList()
        .filter(place => place.title.toLowerCase().indexOf(self.query().toLowerCase()) > -1);
    }
  });

  };




