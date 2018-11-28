const Joi = require("joi");
const express = require("express");
const app = express();

// MIDDLEWARE
app.use(express.json());

const courses = [
  { id: 1, name: "Maths" },
  { id: 2, name: "Science" },
  { id: 3, name: "Computers" }
];

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// GET REQUEST
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// POST REQUEST
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    // BAD REQUEST
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// PUT REQUEST
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send("The requested course was not found in our database...");

  const { error } = validateCourse(req.body);

  if (error) {
    // BAD REQUEST
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

// DELETE REQUEST
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given ID was not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// GET SPECIFIC ID
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send("The requested course was not found in our database...");
  else res.send(course);
});

app.listen(3001, () => console.log("listening to port 3001..."));

function validateCourse(course) {
  // SCHEMA
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  // VALIDATE
  return Joi.validate(course, schema);
}
