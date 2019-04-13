//Uses Knockout JS to handle the ViewModel

var ViewModel = function() {
    var self = this;
    //Takes the user input and binds it to KO
    self.userInput = ko.observable('');
    self.places = ko.observableArray();

    /*Iterates over markers array and creates copies in the places observable array*/
    for(var i = 0; i < markers.length; i++) {
      self.places.push(markers[i])
    }
    /*Animates the markers and opens the infowindow when text in the listview is clicked*/
    // self.listedItem = function(marker) {
    //    google.maps.event.trigger(marker, 'click');
    // }


    /*Function to filter markers in real-time based on user input*/
      this.filteredItems = ko.computed(function() {
        /*converts userInput to lowercase and stores in filter*/
        var filter = self.userInput().toLowerCase();
        /*Checks to see in the places array if any text entered by the user matches the markers,
          if not then all markers stay visible on the map*/
        if (!filter) {
          self.places().forEach(function(item){
            item.setVisible(true);
          });
          return self.places();
         /*If the userInput does match a marker in the places array
           then input is handled by the knockout arrayFilter method*/
        } else {
          /*first we call the call the arrayFilter method and give the places
            array as an argument*/
          return ko.utils.arrayFilter(self.places(), function(item) {
            /*Next we store the result in the variable "match" of getting the lower case maker name and
              making sure that indexOf(filter) returns greater than or equal to 0. If true then the
              array is filtered for only the markers name that match the userinput, which allows for
              real time search functionality in the map.*/
            var match = item.name.toLowerCase().indexOf(filter) >= 0
                  item.setVisible(match);
                  return match;
        })
      }}, self);



    }
