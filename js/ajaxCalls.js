/* This file contains the ajax request for the project. */

var fsrequest = function (marker) {
    var apiURL = 'https://api.foursquare.com/v2/venues/';
    var foursquareClientID = '5WCCP00O5EJYVALVKM2ZSV2R3GPNFIQH0LT4AZNQTUDGKAIC'
    var foursquareSecret ='EOO4AXGRYFEJE0RET4CQJWO0FSCHDERWQPIC0DG5IKU3FSA1';
    var foursquareVersion = '20170115';
    var venueFoursquareID = marker.id;
    var foursquareURL = apiURL + venueFoursquareID + '?client_id=' + foursquareClientID +  '&client_secret=' + foursquareSecret +'&v=' + foursquareVersion;
  
    /*async request for the FourSquare api data*/
    $.ajax({
      url: foursquareURL,
      success: function(data) {
        console.log(data);
        /*FourSquare api data is stored here*/
        var rating = data.response.venue.rating;
        var name =  data.response.venue.name;
        var location = data.response.venue.location.address;
  
        /*The infowindow is udpdated with the FourSquare api data and the infowindow is opened immediately afterwards*/
        infowindow.setContent(name + "; FourSquare Rating: " + rating.toString() + "; " + location);
        infowindow.open(map, marker);
        },
        /*Foursquare api error handling*/
        error: function(error) {
          alert("Error, Four Square api data could not display")
      }
    });
  };
  