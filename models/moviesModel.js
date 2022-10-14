const mongoose = require('mongoose');
const validators = require('../validators/movieValidations')
const {moviesConfig} = require(`../config/${process.env.NODE_ENV}`)
const moviesSchema = new mongoose.Schema({
    name : {
        type:String,
        require : true,
        minlength : 5,
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
        type:String,
        require:true
    },
    category:{
        type: String,
        require : true
    },
});

const Movies = new mongoose.model(moviesConfig.name, moviesSchema);

module.exports = Movies;