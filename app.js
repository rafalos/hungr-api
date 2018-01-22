var express = require("express"),
    app = express(),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose=require("mongoose");
    
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://rafalos:rafal1@ds111608.mlab.com:11608/hungr');


router.get("/", function(req,res){
    res.json({
        message: "Hi"
    })
})



app.use('/api', router);
app.listen(3003, "localhost", function(){
    console.log("server has started");
})