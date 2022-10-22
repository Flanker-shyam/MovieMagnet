
const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const movieValidate = joi.object({
    title : joi.string()
    .required()
    .min(3)
    .max(50)
    ,
    tags:joi.array().items(joi.string()).required()
    ,
    genre:joi.objectId().required()
});

const genreValidate = joi.object({
    name : joi.string()
    .required()
    .min(5)
    .max(50)
});

const customerValidate = joi.object({

    name : joi.string()
    .required()
    .min(5)
    .max(255),

    isGold: joi.boolean()
    .required()
    .default(true),

    phone : joi.string()
    .required()
    .length(10)
});

const rentalValidate = joi.object({
    movie: joi.objectId()
    .required(),
    customer: joi.objectId()
    .required()
});

exports.movieValidate = movieValidate;
exports.customerValidate = customerValidate;
exports.rentalValidate = rentalValidate;
exports.genreValidate = genreValidate;