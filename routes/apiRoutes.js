// LOAD DATA: linking our routes to a series of "data" sources.
var uniqid = require("uniqid");
var fs = require("fs");
var db = require("../db/db.json");

// ROUTING

module.exports = function(app) {
  // API GET Requests: handles when users "visit" a page.

  app.get("/api/notes", function(req, res) {
    console.log("app.get:  ", db);
    res.json(db);
  });

  // API POST Requests: handles when a user submits a form and thus submits data to the server.

  app.post("/api/notes", function(req, res) {

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

  // API POST Requests: handles when a user deletes a specific note.

  app.post("/api/notes/:id", function(req, res) {
    // Empty out the arrays of data
    db.length = 0;
  });

  // API POST Requests: handles when a user clears the entire list of notes

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    db.length = 0;
  });

};