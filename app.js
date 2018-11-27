const fs = require("fs");
// var files = fs.readdirSync("./");
// console.log(files);

fs.readdir("./", function(err, data) {
  if (err) console.log("Error", err);
  else console.log("Data", data);
});

console.log("hey");
