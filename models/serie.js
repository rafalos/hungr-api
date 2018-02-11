var mongoose = require("mongoose");

var serieSchema = mongoose.Schema({
    name: String,
    genre: String,
    seasons: [{
        name: String,
        episodes: [{
            name: String,
            duration: Number,
            watched: false
        }]
    }],
    coverImg: String,
    description: String,
    rates: []

})

module.exports = mongoose.model("Serie", serieSchema);