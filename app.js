const debug = require("debug")("app:startup");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

// TEMPLATEING ENGINE
app.set("view engine", "pug");
app.set("views", "./views"); // default

// ENVIRONMENTS
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

// BUILT-IN MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// THIRD-PARTY MIDDLEWARE
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

// ROUTES
app.use("/", home);
app.use("/api/courses", courses);

// CONFIGURATION
console.log(`Application name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.host")}`);
console.log(`Mail Password: ${config.get("mail.password")}`);

// CREATE CUSTOM MIDDLEWARE FUNCTION
app.use(logger);

app.use(function(req, res, next) {
  console.log("Authenticating...");
  next();
});

app.listen(3001, () => console.log("listening to port 3001..."));
