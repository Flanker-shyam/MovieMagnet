const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require('cors');
const helmet = require("helmet");
const { Genre } = require("../models/genreModel");
const { genreValidate } = require("../validators/joi_validations");
const auth = require("../middleware/auth");
const { default: mongoose } = require("mongoose");
const validateObjectId = require("../middleware/validateObjectId");

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

router.get("/:id", validateObjectId, async (req, res) => {
    const result = await Genre.findById(req.params.id);

    if (!result) {
        return res.status(404).send("Genre with this Id doesn't exist");
    }
    res.status(200).send(result);
});

router.post("/", auth, async (req, res) => {

    const { error } = genreValidate.validate({ name: req.body.name });

    if (error) {
        res.status(400).send(error.message);
        return console.log(error);
    }

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

router.delete("/:id", auth, async(req,res)=>{
    const result = await Genre.findByIdAndRemove(req.params.id);
    if (!result) {
        return res.status(404).send("Genre with this Id doesn't exist");
    }
    res.status(200).send(result);
});

router.put("/:id", auth, async(req,res)=>{
    const result = await Genre.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!result) {
        return res.status(404).send("Genre with this Id doesn't exist");
    }
    res.send(result);
})

module.exports = router;