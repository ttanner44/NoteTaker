// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on db.
// ===============================================================================

var uniqid = require("uniqid");
var fs = require("fs");
var db = require("../db/db.json");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    console.log(uniqid());
    res.json(db);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the JavaScript array
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    let noteObj = {
      id: uniqid(),
      title: req.body.title,
      text: req.body.text
    }

    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      console.log(data);
      const newData = JSON.parse(data);
      newData.push(noteObj);
      console.log(data);
      fs.writeFile("./db/db.json", JSON.stringify(newData), (err) => {
        if (err) throw err;
      res.send(db);
    });
  });
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.

  app.post("/api/notes/:id", function(req, res) {
    // Empty out the arrays of data
    db.length = 0;
  });


  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    db.length = 0;
  });
};