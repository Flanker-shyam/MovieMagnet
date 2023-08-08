const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require('cors');
const helmet = require("helmet");
const rental = require("../models/rentalModel");
const Customer = require("../models/customerModel");
const Movie = require("../models/movieModel");
const {rentalValidate} = require("../validators/joi_validations");

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());


router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

router.get("/", async (req, res) => {
    try {
        const rentals = await rental.find({}).sort(-'outDate');
        res.status(200).send(rentals);
    }
    catch (exp) {
        console.log(exp);
        res.status(400).send(`Error occurred during fetching rentals+ ${exp}`);
    }
});

router.post("/", async (req, res) => {

    const customer = await Customer.findById(req.body.customerId);
    const movie = await Movie.findById(req.body.movieId);

    const {error , value} = rentalValidate.validate({customer : req.body.customerId , movie : req.body.movieId});

    if(error)
    {
        res.send(error.message);
        return console.log(error);
    }

    if (!customer || !movie) {
        return res.status(400).send("invalid customer or Movie");
    }

    if (movie.numberInStock === 0) { res.status(400).send("Movie not available") };

    const newRental = new rental({
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalrate: movie.dailyRentalrate
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        }
    });

    //Transactions of mongodb

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const addedMovie = await rental.create([newRental],{session});
        const foundMovie = await Movie.findOne({ _id: movie._id }, null, { session });
        // console.log(foundMovie);

        foundMovie.numberInStock = foundMovie.numberInStock-1;

        await foundMovie.save();

        await session.commitTransaction();
        res.send(addedMovie);
    }

    catch (e) {
        await session.abortTransaction();
        res.send(e.message);
        console.error(e);
    } finally {
        session.endSession();
  
    }
});

module.exports = router;
