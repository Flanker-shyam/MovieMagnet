const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function () {

    if (!process.env.JWT_KEY) {
        throw new Error("FATAL Error, jwtPrivateKey is not defined");
    }
};