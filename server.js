var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var expressSession = require("express-session")
var userModel = require("./model/user.model.js")
var cn = require("./data/connection.js")

var app = express()

mongoose.connect("mongodb://localhost/sessions")

app.use(cookieParser())
app.use(expressSession({secret: "123456789QWERTY", resave: false, saveUninitialized: true}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function(req, res) {
    var html = "<form method='post' action='/signup'>" +
               "Username: <input type='text' name='userName'><br>" +
               "<input type='submit' value='Send'>" +
               "</form>" +
               "<br><form method='post' action='/login'>" +
               "Username: <input type='text' name='loginUsername'><br>" +
               "<input type='submit' value='LogIn'>" +
               "</form>" +
               "<br>req.session.userName = " + req.session.userName
               
    if(req.session.userName) {
        html += "<br>Your Username is: " + req.session.userName
        html += "<br><form method='post' action='/logout'><button type='submit'>Log Out</button></form>"
    }
    
    res.send(html)
})

app.post("/signup", cn.insert)

app.post("/logout", function(req, res) {
    req.session.userName = null
    res.redirect("/")
})

app.post("/login", cn.login)

app.listen(8080, function() {
    console.log("Server listening in the port 8080.")
})