//Uses Knockout JS to handle the ViewModel

var ViewModel = function() {
    var self = this;
    /*Stores and updates userInput from index.html line 23 with a knockout.js "textinput" databind*/
    self.userInput = ko.observable('');
    /*Stores and upates markers in knockout.js observable array*/
    self.locations = ko.observableArray();
    /*Iterates over markers array and creates copies in the locations observable array*/
    for(var i = 0; i < markers.length; i++) {
      self.locations.push(markers[i])
    }
    /*Animates the markers and opens the infowindow when text in the listview is clicked*/
    self.listedItem = function(marker) {
       google.maps.event.trigger(marker, 'click');
    }
    /*Function to filter markers in real-time based on user input*/
      this.filteredItems = ko.computed(function() {
        /*converts userInput to lowercase and stores in filter*/
        var filter = self.userInput().toLowerCase();
        /*Checks to see in the locations array if any text entered by the user matches the markers,
          if not then all markers stay visible on the map*/
        if (!filter) {
          self.locations().forEach(function(item){
            item.setVisible(true);
          });
          return self.locations();
         /*If the userInput does match a marker in the locations array
           then input is handled by the knockout arrayFilter method*/
        } else {
          /*first we call the call the arrayFilter method and give the locations
            array as an argument*/
          return ko.utils.arrayFilter(self.locations(), function(item) {
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
