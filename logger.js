const EventEmitter = require("events");
const logger = new EventEmitter();

logger.on("logging", args => {
  console.log("Logging: ", args.data);
});

logger.emit("logging", { data: "message" });
