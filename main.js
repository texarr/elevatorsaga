{
    init: function(elevators, floors) {
        var first_elevator = elevators[0];
        var second_elevator = elevators[1];

        program(first_elevator);
        program(second_elevator);

        function program(elevator) {
            elevator.on("idle", function() {
                if (elevator.loadFactor() != 0) {
                    // elevator is not empty, need to transport something
                    console.log(elevator.loadFactor());
                    elevator.destinationQueue = elevator.getPressedFloors();
                    elevator.checkDestinationQueue();
                }else {
                    for (var i = 0; i < floors.length; i++) {
                        floors[i].on('up_button_pressed', function() {
                            elevator.goToFloor(this.level);
                        });
                        floors[i].on('down_button_pressed', function() {
                            elevator.goToFloor(this.level);
                        });
                    }

                    // taking more passengers when going in same direction
                    // to optimilize
                    elevator.on("passing_floor", function(floorNum, direction) {
                        if ((direction === 'up' && elevator.loadFactor() != 1) || (direction == 'down' && elevator.loadFactor() != 1)) {
                            floors[floorNum].on(direction + '_button_pressed', function() {
                                elevator.goToFloor(floorNum);
                            });
                        }
                    });

                    // stop at floor when a button instide is pushed
                    elevator.on("passing_floor", function(floorNum, direction) {
                        if ((direction === 'up' && elevator.loadFactor() != 0) || (direction === 'down' && elevator.loadFactor() != 0)) {
                            if (elevator.getPressedFloors().length != 0 && elevator.getPressedFloors().indexOf(floorNum) != -1) {
                                elevator.goToFloor(floorNum);
                            }
                        }
                    });

                }
            });
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
