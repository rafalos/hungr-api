var mongoose = require("mongoose");

var serieSchema = mongoose.Schema({
    name: String,
    genre: String,
    seasons: [{
        name: String,
        status: 0,
        episodes: [{
            name: String,
            duration: Number,
            watched: {
                type: Boolean,
                default: false
            }
        }]
    }],
    coverImg: String,
    description: String,
    rates: [],
    rated: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model("Serie", serieSchema);