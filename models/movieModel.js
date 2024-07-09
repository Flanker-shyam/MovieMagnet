const mongoose = require('mongoose');
const validators = require('../validators/movieValidations');
const {genreSchema} = require("./genreModel");
const { minBy, lowerCase } = require('lodash');

const movieSchema = new mongoose.Schema({
    title : {
        type:String,
        require : true,
        minlength : 5,
        maxlength: 255,
        trim:true,
        lowercase:true
    },
    description: {
        type:String,
        require:false,
        maxlength:76500,
        trim:true,
        lowercase:true
    },
    imagePath: {
        type:String,
        require: false,
    },
    cast:{
        type:Array,
        require: true
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

const movie = new mongoose.model("movie", movieSchema);

module.exports = movie;