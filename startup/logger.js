const { createLogger, format, transports } = require('winston');
const winston = require("winston");
require("express-async-errors");
const express= require("express");
const app = express();

module.exports = function (app) {
    const logger = createLogger({
        format: format.combine(
            format.json(),
            format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
            format.align(),
            format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        ),
        transports: [new transports.Console(),
        new transports.File({
            filename: 'logs/server.log',
        }),
        ]
    });

    new winston.ExceptionHandler(
        new winston.transports.File({ filename: "uncaughtException.log" })
    );

    process.on("unhandledRejection", (ex) => {
        throw (ex);
    });
    return logger;
};
