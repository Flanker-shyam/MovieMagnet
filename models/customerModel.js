const { boolean } = require('joi');
const { default: mongoose } = require('mongoose');
const mongooose = require('mongoose');


const customerScheme = new mongoose.Schema({
    name :{
        type:String,
        required: true,
        minlength: 5,
        maxlength : 255,
    },
    isGold : {
        type: Boolean,
        required: true,
    },
    phone:{
        type: String,
        required: true,
        length:10
    },
});

const Customer = new mongooose.model("Customer", customerScheme);

module.exports = Customer;