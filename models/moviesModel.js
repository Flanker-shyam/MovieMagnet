const mongoose = require('mongoose');
const validators = require('../validators/movieValidations');
const {moviesConfig} = require(`../config/${process.env.NODE_ENV}`);
const {genreSchema} = require("./genreModel");

const moviesSchema = new mongoose.Schema({
    title : {
        type:String,
        require : true,
        minlength : 5,
        maxlength: 255,
        trim:true,
        lowercase:true
    },
    tags:{
        type:Array,
        validate:{
            validator: validators.validateTags,
            message : "Need at least one value in the tags",
        }
    },
    genre:{
        type:genreSchema,
        require:true
    },
    numberInStock:{
        type : Number,
        min:0,
        max:255,
        require : true
    },
    dailyRentalrate:{
        type : Number,
        min:0,
        max : 255,
        require: true
    }
});

const Movies = new mongoose.model(moviesConfig.name, moviesSchema);

module.exports = Movies;