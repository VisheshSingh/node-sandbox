const Logger = require("./logger");
const logger = new Logger();

// Register a listener
logger.on("messageLogged", args => {
  console.log("Args: ", args);
});

logger.log("message");
