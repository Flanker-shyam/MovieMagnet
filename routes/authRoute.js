const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require('cors');
const helmet = require("helmet");
const User = require("../models/UserModel");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const joi = require("joi");
const { authValidate } = require("../validators/joi_validations");

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

router.post("/", async (req, res) => {

    const { error } = authValidate.validate({ email: req.body.email, password: req.body.password });

    if (error) {
        res.send(error.message);
        return console.log(error);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("Invalid email or Password");
    }

    const isPassCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPassCorrect) {
        return res.status(400).send("Invalid email or Password");
    }

    try {
        const token = user.generateAuthToken();
        
        // Add the token to the user object and exclude the password
        const userWithToken = {
            ...user.toObject(),
            token: token
        };
        delete userWithToken.password;

        res.status(200).send(userWithToken);
    } catch (exp) {
        res.status(500).send(exp.message);
    }
});


module.exports = router;