const express = require("express");
const app = express();

const courses = [
  { id: 1, name: "Maths" },
  { id: 2, name: "Science" },
  { id: 3, name: "Computers" }
];

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    res
      .status(404)
      .send("The requested course was not found in our database...");
  else res.send(course);
});

app.listen(3001, () => console.log("listening to port 3001..."));
