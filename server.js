var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var expressSession = require("express-session")

var app = express()
mongoose.connect("mongodb://localhost/sessions")

var db = mongoose.connection
db.on("error", console.error.bind(console, "Connection error: "))
db.once("open", function() {
    console.log("Connected to DB.")
})

app.use(cookieParser())
app.use(expressSession({secret: "123456789QWERTY"}))
app.use(bodyParser())

app.get("/", function(req, res) {
    var html = "<form method='post' action='/'>" +
               "Username: <input type='text' name='userName'><br>" +
               "<input type='submit' value='Send'>" +
               "</form>"
               
    if(req.session.userName) {
        html += "<br>Your Username is: " + req.session.userName
        html += "<br><form method='post' action='/logout'><button type='submit'>Log Out</button></form>"
    }
    
    res.send(html)
})

app.post("/", function(req, res) {
    req.session.userName = req.body.userName
    res.redirect("/")
})

app.post("/logout", function(req, res) {
    req.session.userName = null
    res.redirect("/")
})


app.listen(8080, function() {
    console.log("Server listening in the port 8080.")
})