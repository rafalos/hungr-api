var express = require("express"),
      app = express();
      

app.get("/", function(req,res){
    res.send("works")
})




app.listen(3003, "localhost", function(){
    console.log("server has started");
})