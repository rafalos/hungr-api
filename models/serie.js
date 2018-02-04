var mongoose = require("mongoose");

var serieSchema = mongoose.Schema({
    name: String,
    seasons: [{
        name: String,
        episodes: [{
            name: String,
            duration: Number
        }]
    }],
    coverImg: String,
    description: String

})

module.exports = mongoose.model("Serie", serieSchema);