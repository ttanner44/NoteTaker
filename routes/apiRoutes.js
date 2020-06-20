// LOAD DATA: linking our routes to a series of "data" sources.
var uniqid = require("uniqid");
var fs = require("fs");
var notes = require("../db/db.json");
const { Console } = require("console");

// ROUTING
module.exports = function(app) {
  // API GET Requests: handles when users "visit" a page.
  app.get("/api/notes", function(req, res) {
    res.json(notes);
  });

  // API POST Requests: handles when a user submits a form and thus submits data to the server.
  app.post("/api/notes", function(req, res) {
    
    // uses NPM UNIQID to create unique id
    let noteObj = {
      id: uniqid(),
      title: req.body.title,
      text: req.body.text
    }

    // First read read JSON file and parse
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let newData = JSON.parse(data);
      
      // Push new record into Array
      newData.push(noteObj);

      // Write updated file to JSON
      fs.writeFile("./db/db.json", JSON.stringify(newData), (err) => {
        if (err) throw err;
      notes = newData;
      res.send(notes);
      });

    });
  });

  // API DELETE Requests: handles when a user deletes a specific note.
  app.delete("/api/notes/:id", function(req, res) {
    let deleteID = req.params.id;

    // read file and parse data
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let newData = JSON.parse(data);

      // ID record to delete and splice
      for (let i=0; i< newData.length; i++) {
        if (newData[i].id === deleteID) {
          newData.splice(i,1);
        }
      }  
      // re-write file
      fs.writeFile("./db/db.json", JSON.stringify(newData), (err) => {
        if (err) throw err;
      notes = newData;
      res.send(notes);
      });
    });
  });

};