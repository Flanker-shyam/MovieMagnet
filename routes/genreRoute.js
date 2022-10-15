const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require('cors');
const helmet = require("helmet");
const {Genre} = require("../models/genreModel");

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

router.get("/", async (req, res) => {
    const result = await Genre.find().sort('name');
    res.send(result);
})

router.post("/", async (req, res) => {
    
    const newGenre = new Genre({
        name: req.body.name
    });

    try {
        const result = await newGenre.save();
        res.send({ status: "success", result });
    }
    catch (exp) {
        res.status(500).send(exp.message);
        console.log(exp.message);
    }
});

module.exports = router;