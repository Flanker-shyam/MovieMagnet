const mongoose = require('mongoose');
const Genre = require("./genreModel");
const validators = require("../validators/index");

const moviesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 5,
        lowercase: true
    },
    tags:{
        type: Array,
        validate: {
            validator: validators.validateTags,
            message: "Need at least one value in the tags",
        }
    },
    category:{
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    }
});

const Movies = new mongoose.model("Movies", moviesSchema);

module.exports = Movies;