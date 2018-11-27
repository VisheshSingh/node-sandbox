const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register a listener
emitter.on("messageLogged", function() {
  console.log("message");
});

// Raise an event
emitter.emit("messageLogged");
