var mongoose = require("mongoose");

var recipeSchema = mongoose.Schema({
    name: String,
    preparationTime: Number,
    ingredients: [],
    description: String
})

module.exports = mongoose.model("Recipe", recipeSchema);