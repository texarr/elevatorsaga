{
    init: function(elevators, floors) {
      program(elevators[0]);

      function program(elevator) {
        var route = [];
        var routeDestination = -1;
        elevator.goingDownIndicator(false);

        for (var i = 0, length = floors.length; i < length; i++) {
          // Event for buttons pressed inside elevator
          //
          elevator.on("floor_button_pressed", function(floorNum) {

          })
          //
          // endof event for inside buttons

          // Event listeners on buttons pressed on floors
          //
          floors[i].on('up_button_pressed', function() {
            if (elevator.goingUpIndicator() && elevator.currentFloor() < this.floorNum()) {
              if (elevator.loadFactor() < 1) {
                route = elevator.destinationQueue;
                if (!checkFloorInRoute(this.floorNum(), route)) {
                  // pushed floor is not in route right now. Adding floor to route
                  route.push(this.floorNum());
                  route.sort();
                  elevator.destinationQueue = route;
                  elevator.checkDestinationQueue();
                }

              }
            }
          });
          floors[i].on('down_button_pressed', function() {
            if (elevator.goingDownIndicator() && elevator.currentFloor() > this.floorNum()) {
              if (elevator.loadFactor() < 1) {
                route = elevator.destinationQueue;
                if (!checkFloorInRoute(this.floorNum(), route)) {
                  // pushed floor is not in route right now. Addin floor to route
                  route.push(this.floorNum());
                  route.sort();
                  elevator.destinationQueue = route;
                  elevator.checkDestinationQueue();
                }
              }
            }
          });
          //
          // endof buttons pressed listeners

          // on passing floor, checking route and destination or new button pushed
          //
          elevator.on("passing_floor", function(floorNum, direction) {

          });
          //
          // endof passing floor listener
        }

        function checkFloorInRoute(pushedBtn, route) {
          for (var i = 0; i < route.length; i++) {
            if (route[i] === pushedBtn) {
              return true;
            }else {
              return false;
            }
          }
        }

      }

    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
