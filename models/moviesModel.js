const mongoose = require('mongoose');
const validators = require("../validators/index");

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
            validator: function(v){
                return (v && v.length>0);
            },
            message : "Need atleast one value in the tags",
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

const Movies = new mongoose.model("Movies", moviesSchema);

module.exports = Movies;