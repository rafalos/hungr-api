var mongoose = require("mongoose");

var serieSchema = mongoose.Schema({
    name: String,
    genre: String,
    seasons: [{
        name: String,
        episodes: [{
            name: String,
            duration: Number,
            watched: Boolean
        }]
    }],
    coverImg: String,
    description: String

})

module.exports = mongoose.model("Serie", serieSchema);