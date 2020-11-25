var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


  // If no matching route is found default to home
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// require("/public/index.html")(app);
// require("/public/notes.html")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
