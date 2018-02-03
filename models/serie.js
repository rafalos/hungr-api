var mongoose = require("mongoose");

var serieSchema = mongoose.Schema({
    name: String,
    episodes: [],
    coverImg: String,
    description: String

})

module.exports = mongoose.model("Serie", serieSchema);