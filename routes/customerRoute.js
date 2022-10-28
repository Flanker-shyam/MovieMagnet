
const express = require("express");
const router = express.Router();
const customer = require('../models/customerModel');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require('cors');
const helmet = require("helmet");
const { application } = require("express");
const { customerValidate } = require("../validators/joi_validations");

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

router.get("/", async (req, res) => {

    const result = await customer.find().sort("name");
    res.send(result);

});

router.post("/", async (req, res) => {

    const { error, value } = customerValidate.validate({ name: req.body.name, isGold: req.body.isGold, phone: req.body.phone });
    if (error) {
        res.send(error.message);
        return console.log(error);
    }

    const newCustomer = new customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });

    try {
        const result = await newCustomer.save();
        res.send(result);
    }
    catch (exp) {
        res.status(505).send(exp.message);
    }
});

module.exports = router;