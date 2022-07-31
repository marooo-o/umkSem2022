'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Successfully connected to database");
    }).catch((error) => {
        throw error;
    });
};
