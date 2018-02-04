var mongoose = require("mongoose");

var serieSchema = mongoose.Schema({
    name: String,
    seasons: [],
    coverImg: String,
    description: String

})

module.exports = mongoose.model("Serie", serieSchema);