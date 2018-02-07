var express = require("express"),
    app = express(),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Serie = require("./models/serie"),
    cors = require('cors'),
    morgan = require("morgan"),
    passport = require("passport"),
    jwt = require("jsonwebtoken"),
    config = require("./config/config.js"),
    User = require("./models/user")


app.use(cors())
app.use(morgan("dev"))
app.use(passport.initialize())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
      

app.use(bodyParser.urlencoded({ extended: true })),
app.use(bodyParser.json()),
mongoose.connect(config.database)
require("./config/passport.js")(passport)



///AUTH//
router.post("/register", function(req, res) {
    if(!req.body.email || !req.body.password) {
        res.json({
            success: false,
            message: "Please enter email and password"
        })
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });
        newUser.save(function(err){
            if(err) {
                return res.json({
                    success: false,
                    message: "Email already exist"
                })
            }
            res.json({
                success: true,
                message: "Successfully created new user"
            })
        })
    }
})


router.post("/authenticate", function(req, res){
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err
        if (!user) {
            res.send({
                success: false,
                message: "Auth failed, user not found"
            })
        }else {
            user.comparePassword(req.body.password, function(err, isMatch){
                if(isMatch && !err) {
                    var token = jwt.sign(user.toObject(), config.secret, {
                        expiresIn: 10000 /// seconds
                    });
                    res.json({
                        success: true,
                        token: "JWT "+ token,
                        user: user
                    })
                } else {
                    res.send({
                        success: false,
                        message: "Auth failed, Passwords did not match"
                    })
                }
            })
        }
    })
})





////FETCH ALL SERIES/////
router.get("/series", function(req,res,next){
    Serie.find({}, function(err, foundSeries){
        res.jsonp({
            series: foundSeries
        })
    })
})

router.post("/series", passport.authenticate("jwt", {session: false}), function(req, res, next){
    Serie.create(req.body, function(err, createdSerie){
        if(err){
            console.log(err)
        }else {
            console.log(createdSerie)
        }
    })
})

router.get("/series/:id", function(req, res, next){
    Serie.findById(req.params.id, function(err, foundSerie){
        if(err) {
            console.log(err)
        } else {
            res.jsonp({
                serie: foundSerie
            })
        }
    })
})

router.post("/series/:id", function(req, res, next){
    var season = req.body.seasonName;
    console.log(season)
    Serie.findById(req.params.id, function(err, foundSerie){
        if(err){
            console.log(err)
        } else {
            for(var i=0; i<foundSerie.seasons.length; i++){
                if(foundSerie.seasons[i].name == season) {
                   console.log( foundSerie.seasons[i].name )
                    foundSerie.seasons[i].episodes.push({
                        name: req.body.name,
                        duration: req.body.duration
                    })
                }
            }
            foundSerie.save()
            res.jsonp({
                name: req.body.name,
                duration: req.body.duration
            })
        }
    })
})

////////////////////




app.use('/api', router);
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
})