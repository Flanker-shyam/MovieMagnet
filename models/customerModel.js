
const mongoose = require("mongoose");


const customerScheme = new mongoose.Schema({
    name :{
        type:String,
        required: true,
        minlength: 5,
        maxlength : 255,
    },
    isGold : {
        type: Boolean,
        default : false,
        required: true,
    },
    phone:{
        type: String,
        required: true,
        length:10
    }
});

const Customer = new mongoose.model("Customer", customerScheme);

module.exports = Customer;
