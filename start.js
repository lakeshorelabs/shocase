// start server to run app
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080);
console.log("Please open your web browser to http://localhost:8080 to view shocase demo");

