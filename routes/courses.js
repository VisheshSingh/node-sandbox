const express = require("express");
const Joi = require("joi");
const router = express.Router();

const courses = [
  { id: 1, name: "Maths" },
  { id: 2, name: "Science" },
  { id: 3, name: "Computers" }
];

// GET REQUEST
router.get("/", (req, res) => {
  res.send(courses);
});

// POST REQUEST
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given ID was not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// GET SPECIFIC ID
router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send("The requested course was not found in our database...");
  else res.send(course);
});

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

module.exports = router;
