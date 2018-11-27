// (function(exports, require, module, __filename,__dirname){}) --> MODULE WRAPPER FUNCTION
console.log(__filename);
console.log(__dirname);
var url = "http://mylogger.io/logs";

function log(mesg) {
  console.log(mesg);
}

module.exports = log;
