const mongoose = require("mongoose");
const config = require("config");
var jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

userSchema.methods.generateAuthToken = function () {
    const jwt_key = process.env.JWT_KEY;
    const token = jwt.sign({ _id: this._id }, jwt_key);
    return token;
}

module.exports = new mongoose.model("Users", userSchema);