// DEPENDENDENCIES: include the path package to get the correct file path for our html

var path = require("path");

// ROUTING

module.exports = function(app) {
  // HTML GET Requests - iNDEX PAGE ON lOCALHOST:8080/index
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // HTML GET Requests - Notes Pape on lOCALHOST:8080/notes
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // If no matching route is found default to index page
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};