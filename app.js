const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/courses/:id/:month/:year", (req, res) => {
  //   res.send(req.params.id);
  res.send(req.params);
});

app.listen(3001, () => console.log("listening to port 3001..."));
