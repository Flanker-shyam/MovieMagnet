const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type :String,
        require: true,
        minlength:5,
        maxlength:50
    },
    
    email :{
        type : String,
        unique:true,
        required: true
    },

    password:{
        type : String,
        required : true,
        minlength:5,
        maxlength : 1024
    }
});

module.exports = new mongoose.model("Users" , userSchema);