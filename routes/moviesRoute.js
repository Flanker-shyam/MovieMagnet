const express = require("express");
const router = express.Router();
const movies = require('../models/moviesModel');
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
    const result = await movies.find().sort('name');
    res.send(result);
})

router.post("/", async (req, res) => {
    const genre = await Genre.findById(req.body.genreId);
    if(!genre){return res.status(400).send("Invalid Genre Id")};

    const newMovie = new movies({
        title: req.body.title,
        tags: req.body.tags,
        genre:{
            _id:genre._id,
            name : genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalrate:req.body.dailyRentalrate
    });

    try {
        const result = await newMovie.save();
        res.send({ status: "success", result });
    }
    catch (exp) {
        res.status(500).send(exp.message);
        console.log(exp.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
      const result = await movies.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
      if (!result) {
          res.status(404).send("Movie with this title doesn't exist");
      }
      else {
          res.send(result);
      }
    } catch (e) {
          res.status(500).send("Internal Server Error")
    }
});

router.delete("/:id", async (req, res) => {
  try { 
      const result = await movies.findByIdAndRemove(req.params.id);
      if (!result) {
          res.status(404).send("Movie with this title doesn't exist");
      }
      else {
          res.send(result);
      }
  } catch(e) {
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router;
