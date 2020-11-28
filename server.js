var express = require("express");
var path = require("path");
var apiData = require("./db/db.json");

var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.json(apiData);
});

app.post("/api/notes", function(req, res) {

    apiData.push(req.body);
    res.json(apiData);
});

app.delete("/api/notes/:id", function(req, res) {

    const id = req.params.id;
    apiData.splice(id, 1);
    res.json(apiData);
});

  // If no matching route is found default to home
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});




// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.


// require("/public/index.html")(app);
// require("/public/notes.html")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
