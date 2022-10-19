const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require('cors');
const helmet = require("helmet");
const Fawn = require("fawn");
const rental = require("../models/rentalModel");
const Customer = require("../models/customerModel");
const Movie = require("../models/moviesModel");
// const Movies = require("../models/moviesModel");

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(helmet());

// const URI = process.env.DB_URL;

// Fawn.init(URI);

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

router.get("/", async (req, res) => {
    try {
        const rentals = await rental.find({}).sort(-outDate);
        res.send(rentals);
    }
    catch (exp) {
        res.status(400).send("Error occurred during fetching rentals", exp);
    }
});

router.post("/", async (req, res) => {
    // console.log(Movie);
    const customer = await Customer.findById(req.body.customerId);
    console.log(req.body.movieId);
    const movie = await Movie.findById(req.body.movieId);

    console.log(customer);
    console.log(movie);
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

    try {
        const result = await newRental.save();
        // new Fawn.Task()
        //     .save("rentals", newRental)
        //     .update("movies", {_id:movie._id},{ $inc: {numberInStock: -1}})
        //     .run();

            res.send(result);
    }
    catch(exp)
    {
        res.status(500).send("Error occurred in ops");
    }
});

module.exports = router;
