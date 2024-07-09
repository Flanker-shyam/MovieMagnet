
const Joi = require("joi");
const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const movieValidate = joi.object({
    title: joi.string()
        .required()
        .min(3)
        .max(50)
    ,
    description: Joi.string().max(76500),
    image_path: Joi.string(),
    cast:Joi.array(),
    tags: joi.array().items(joi.string()).required()
    ,
    genre: joi.objectId().required()
});

const genreValidate = joi.object({
    name: joi.string()
        .required()
        .min(5)
        .max(50)
});

const customerValidate = joi.object({

    name: joi.string()
        .required()
        .min(5)
        .max(255),

    isGold: joi.boolean()
        .required()
        .default(true),

    phone: joi.string()
        .required()
        .length(10)
});

const rentalValidate = joi.object({
    movie: joi.objectId()
        .required(),
    customer: joi.objectId()
        .required()
});


const userValidate = joi.object({
    name: joi.string()
        .required()
        .min(5)
        .max(255),

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: joi.string()
        .pattern(new RegExp('^[A-Za-z][A-Za-z0-9@#%&*]*$')),

    repeat_password: joi.ref('password'),

})
    .with('password', 'repeat_password');

const authValidate = joi.object({
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: joi.string()
        .pattern(new RegExp('^[A-Za-z][A-Za-z0-9@#%&*]*$')),

});

exports.movieValidate = movieValidate;
exports.customerValidate = customerValidate;
exports.rentalValidate = rentalValidate;
exports.genreValidate = genreValidate;
exports.userValidate = userValidate;
exports.authValidate = authValidate;