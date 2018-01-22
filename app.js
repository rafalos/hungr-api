var express = require("express"),
    app = express(),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose=require("mongoose"),
    Recipe = require("./models/recipe");  
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    mongoose.connect('mongodb://rafalos:rafal1@ds111608.mlab.com:11608/hungr');





router.get("/recipes", function(req,res){
    Recipe.find({}, function(err, foundRecipes){
        res.json({
            recipes: foundRecipes
        })
    })
})



app.use('/api', router);
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
})