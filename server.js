var express = require("express");
var path = require("path");
var serve = require('express-static');


var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")));
 
console.dir(app);   
var reservations = [
    {
        resName: "Bob",
        resPhone: "310-867-5309",
        resEmail: "dont@bothme.com",
        resID: "Bob the Destroyer"
    }
];

var waitList = [
    {
        resName: "Deb",
        resPhone: "555-555-5555",
        resEmail: "deb@debbie.com",
        resID: "Little Debbie"
    }
];


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});


app.get("/api/reserve", function(req, res) {
    return res.json(reservations);
});


app.post("/api/reserve", function(req, res) {
    // console.log(req.body);
    var newReservation = req.body;
    // console.log(newReservation.resName);
    newReservation.routeName = newReservation.resName.replace(/\s+/g, "").toLowerCase();
    // console.log(newReservation)
    if (reservations.length < 5) {
        reservations.push(newReservation);
    } else {
        waitList.push(newReservation)
    }
    res.json(reservations);
    console.log(waitList);
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});