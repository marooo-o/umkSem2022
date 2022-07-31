'use strict';

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: false,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: [String]
    },
    confirmed: {
        required: false,
        type: Boolean
    }
}, {
    collection: 'user',
});

module.exports = mongoose.model('User', dataSchema);
