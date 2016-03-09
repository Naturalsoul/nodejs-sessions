var userModel = require("../model/user.model.js")

exports.insert = function(req, res) {
    var newUser = {
        username: req.body.userName
    }
    
    userModel.findOne({username: newUser.username}, function(err, data) {
            if(err) throw err
            if(data != null)  {
                var html = "<form method='post' action='/signup'>" +
                           "Username: <input type='text' name='userName'><br>" +
                           "<input type='submit' value='Send'>" +
                           "</form>" +
                           "<br><form method='post' action='/login'>" +
                           "Username: <input type='text' name='loginUsername'><br>" +
                           "<input type='submit' value='LogIn'>" +
                           "</form>" +
                           "<br>req.session.userName = " + req.session.userName +
                           "<br>Username already registered!: " + data
                           
                res.status(403).send(html)
            }
            else {
                req.session.userName = newUser.username
                new userModel({username: newUser.username}).save()
                res.redirect("/")
            }
    })
}

exports.login = function(req, res) {
    userModel.findOne({ username: req.body.loginUsername }, function(err, data) {
        if(err) throw err
        if(data != null) {
            req.session.userName = req.body.loginUsername
            var html = "<form method='post' action='/signup'>" +
                        "Username: <input type='text' name='userName'><br>" +
                        "<input type='submit' value='Send'>" +
                        "</form>" +
                        "<br><form method='post' action='/login'>" +
                        "Username: <input type='text' name='loginUsername'><br>" +
                        "<input type='submit' value='LogIn'>" +
                        "</form>" +
                        "<br>req.session.userName = " + req.session.userName
                        
            html += "<br>Your Username is: " + req.session.userName
            html += "<br><form method='post' action='/logout'><button type='submit'>Log Out</button></form>"
                           
            res.status(403).send(html)
        } else {
            var html = "<form method='post' action='/signup'>" +
                       "Username: <input type='text' name='userName'><br>" +
                       "<input type='submit' value='Send'>" +
                       "</form>" +
                       "<br><form method='post' action='/login'>" +
                       "Username: <input type='text' name='loginUsername'><br>" +
                       "<input type='submit' value='LogIn'>" +
                       "</form>" +
                       "<br>req.session.userName = " + req.session.userName +
                       "<br>Invalid Username."
                       
            res.status(403).send(html)
        }
    })
}