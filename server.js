var express = require("express");
var path = require("path");
var apiData = require("./db/db.json");

var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// display the notes.html page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//api call to display all saved notes
app.get("/api/notes", function(req, res) {
    res.json(apiData);
});

//save current note to db.json
app.post("/api/notes", function(req, res) {

    let newNote = {
        "id": apiData.length,
        "title": req.body.title,
        "text": req.body.text
    }

    apiData.push(newNote);
    res.json(apiData);
});

//return choosen note from db.json
app.get("/api/notes/:id", function(req, res) {
    
    const id = req.params.id;
    res.json(apiData[id]);
});

//delete choosen note from db.json
app.delete("/api/notes/:id", function(req, res) {

    const id = req.params.id;
    apiData.splice(id, 1);
    res.json(apiData);
});

  // If no matching route is found default to home
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//set up port listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
