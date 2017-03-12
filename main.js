{
    init: function(elevators, floors) {
      program(elevators[0]);

      function program(elevator) {
        var route = [];
        var routeDestination;
        elevator.goingDownIndicator(false);
        elevator.goingUpIndicator(true);

        for (var i = 0, length = floors.length; i < length; i++) {
          // Event for buttons pressed inside elevator
          //
          elevator.on("floor_button_pressed", function(floorNum) {
            if (elevator.destinationQueue.length === 0) {
              elevator.destinationQueue.push(floorNum);
              routeDestination = floorNum;
              if (elevator.currentFloor() < routeDestination) {
                elevator.goingUpIndicator(true);
                elevator.goingDownIndicator(false);
              }else if (elevator.currentFloor() > routeDestination) {
                elevator.goingUpIndicator(false);
                elevator.goingDownIndicator(true);
              }
            }else if (elevator.destinationQueue.length != 0) {
              if ((elevator.currentFloor() < floorNum) && elevator.goingUpIndicator()) {
                if (floorNum < routeDestination) {
                  elevator.destinationQueue.push(floorNum);
                  elevator.destinationQueue.sort();
                  elevator.checkDestinationQueue();
                }else {
                  routeDestination = floorNum;
                  elevator.destinationQueue.push(floorNum);
                  elevator.checkDestinationQueue();
                }
              }else if ((elevator.currentFloor() > floorNum) && elevator.goingDownIndicator()) {
                if (floorNum > routeDestination) {
                  //
                }
              }
            }
          })
          //
          // endof event for inside buttons

          // Event listeners on buttons pressed on floors
          //
          floors[i].on('up_button_pressed', function() {
            if (elevator.goingUpIndicator() && elevator.currentFloor() < this.floorNum()) {
              if (elevator.loadFactor() < 1) {
                if (!checkFloorInRoute(this.floorNum(), elevator.destinationQueue)) {
                  // pushed floor is not in route right now. Adding floor to route
                  elevator.destinationQueue.push(this.floorNum());
                  elevator.destinationQueue.sort();
                  routeDestination = elevator.destinationQueue[elevator.destinationQueue.length - 1];
                  elevator.goingUpIndicator(true);
                  elevator.checkDestinationQueue();
                }

              }
            }
          });
          floors[i].on('down_button_pressed', function() {
            if (elevator.goingDownIndicator() && elevator.currentFloor() > this.floorNum()) {
              if (elevator.loadFactor() < 1) {
                if (!checkFloorInRoute(this.floorNum(), elevator.destinationQueue)) {
                  // pushed floor is not in route right now. Addin floor to route
                  elevator.destinationQueue.push(this.floorNum());
                  elevator.destinationQueue.sort();
                  routeDestination = elevator.destinationQueue[elevator.destinationQueue.length - 1];
                  elevator.goingDownIndicator(true);
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
