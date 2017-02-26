{
    init: function(elevators, floors) {
        var first_elevator = elevators[0];
        var second_elevator = elevators[1];

        program(first_elevator);
        program(second_elevator);

        function program(elevator) {
            elevator.on("idle", function() {
                if (elevator.loadFactor() > 0) {
                    // elevator is not empty, need to transport something
                    doInnerRoute(elevator);
                }else {
                    // elevator is empty and waiting for orders
                    for (var i = 0; i < floors.length; i++) {
                        floors[i].on('up_button_pressed', function() {
                            elevator.goToFloor(this.level);
                        });
                        floors[i].on('down_button_pressed', function() {
                            elevator.goToFloor(this.level);
                        });
                    }
                }
            });

            // elevator isnt idle
            // i need to write code that takes another people who wants go in same direction
        }

        function doInnerRoute(elevator) {
            elevator.destinationQueue = elevator.getPressedFloors();
            elevator.checkDestinationQueue();
        }
    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
