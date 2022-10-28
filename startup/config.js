const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function () {

    if (!config.get('jwtPrivatekey')) {
        throw new Error("FATAL Error, jwtPrivateKey is not defined");
    }
};