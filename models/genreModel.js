const mongoose = require('mongoose');
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        require : true, 
        minlength:5,
        maxlength:50
    },
});

const Genre = new mongoose.model("Genre" , genreSchema);

exports.genreSchema = genreSchema;
exports.Genre = Genre;