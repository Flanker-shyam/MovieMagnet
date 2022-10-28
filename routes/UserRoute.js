const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require('cors');
const helmet = require("helmet");
const User = require("../models/UserModel");
const { userValidate } = require("../validators/joi_validations");
const _ = require("lodash");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

const complexityOptions = {
    min: 6,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
};

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

router.get("/me", auth , async(req,res)=>{
    const user = await User.findById(req.body._Id).select("-password");
    res.send(user);
})

router.post("/", async (req, res) => {

    var { error } = userValidate.validate({ name: req.body.name, email: req.body.email, password: req.body.password, repeat_password: req.body.repeat_password });

    if (error) {
        res.send(error.message);
        return console.log(error);
    }

    var { error } = passwordComplexity(complexityOptions).validate(req.body.password);
    if (error) {
        return res.send(error.message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send("User already registered");
    }

    const newUser = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    try {
        await newUser.save();
        const token = newUser.generateAuthToken();
        res.header('x-user-auth-token',token).send(_.pick(newUser, ['_id', 'name', 'email']));
    }
    catch (exp) {
        res.status(500).send(exp.message)
    }
});

module.exports = router;
