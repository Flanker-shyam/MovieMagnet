const express = require("express");
const router = express.Router();
const movies = require('../models/movieModel');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require('cors');
const helmet = require("helmet");
const { Genre } = require("../models/genreModel");
const { movieValidate } = require("../validators/joi_validations");
const auth = require("../middleware/auth");
const fs = require('fs');
const multer = require("multer")

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

router.get("/",async (req, res) => {  
    console.log("request hereeeee")
    const result = await movies.find().sort('name');
    res.send(result);
})

router.post("/",auth,upload.single('image'), async (req, res) => {
    const genre = await Genre.findById(req.body.genreId);

    if (!genre) { return res.status(400).send("Invalid Genre Id") };

    const { error } = movieValidate.validate({title:req.body.title, tags:req.body.tags, genre:req.body.genreId});

    if(error)
    {
        res.send(error.message);
        return console.log(error);
    }
    const newmovie = new movies({
        title: req.body.title,
        tags: req.body.tags,
        description:req.body.description,
        image_path:{
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        cast: req.body.cast,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalrate: req.body.dailyRentalrate
    });

    try {
        const result = await newmovie.save();
        res.send({ status: "success", result });
    }
    catch (exp) {
        res.status(500).send(exp.message);
        console.log(exp.message);
    }
});

router.put("/:id",auth, async (req, res) => {
    try {
        const result = await movies.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!result) {
            res.status(404).send("movie with this title doesn't exist");
        }
        else {
            res.send(result);
        }
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:id",auth, async (req, res) => {
    try {
        const result = await movies.findByIdAndRemove(req.params.id);
        console.log(req.params);
        if (!result) {
            res.status(404).send("movie with this title doesn't exist");
        }
        else {
            res.send(result);
        }
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
