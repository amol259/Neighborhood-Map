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


/* Ajax request for the project. */

var fourSquarerequest = function (marker) {
  var apiURL = 'https://api.foursquare.com/v2/venues/';
  var foursquareClientID = '5WCCP00O5EJYVALVKM2ZSV2R3GPNFIQH0LT4AZNQTUDGKAIC'
  var foursquareSecret ='EOO4AXGRYFEJE0RET4CQJWO0FSCHDERWQPIC0DG5IKU3FSA1';
  var foursquareVersion = '20170115';
  var venueId = marker.id;
  var foursquareURL = apiURL + venueId + '?client_id=' + foursquareClientID +  '&client_secret=' + foursquareSecret +'&v=' + foursquareVersion;

  /*async request for the FourSquare api data*/
  $.ajax({
    url: foursquareURL,
    success: function(data) {
      //Grab the following from the api response
      var name =  data.response.venue.name;
      var url = data.response.venue.url;
      var description = data.response.venue.description;
      console.log(name);
      console.log(url);
      console.log(description);

      /*The infowindow is udpdated with the FourSquare api data and the infowindow is opened immediately afterwards*/
      infowindow.setContent(name + "\n" + "Description: " + description.toString() + "\n ");
      infowindow.open(map, marker);
      },
      error: function(error) {
        alert("Error, Four Square api data could not display")
    }
  });
};


