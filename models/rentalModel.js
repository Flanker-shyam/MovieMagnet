
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                require: true,
                minlength: 5,
                maxlength: 255,
                trim: true,
                lowercase: true
            },
            dailyRentalrate: {
                type: Number,
                min: 0,
                max: 255,
                require: true
            }
        }),
        require: true
    },
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255,
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                length: 10
            },
        }),
        require: true
    },
    outDate: {
        type: Date,
        require: true,
        default: Date.now,
    },
    returnDate: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}
)

const Rental = new mongoose.model("Rental", rentalSchema);

module.exports = Rental;