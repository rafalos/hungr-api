var express = require("express"),
    app = express(),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose=require("mongoose"),
    Serie = require("./models/serie");

app.use(bodyParser.urlencoded({ extended: true })),
app.use(bodyParser.json()),
mongoose.connect('mongodb://rafalos:rafalos@ds223268.mlab.com:23268/series7');

router.get("/series", function(req,res){
    Serie.find({}, function(err, foundSeries){
        res.json({
            series: foundSeries
        })
    })
})



app.use('/api', router);
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
})