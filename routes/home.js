const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "My express app",
    message: "Hi, the api is available at 'api/courses'"
  });
});

module.exports = router;
