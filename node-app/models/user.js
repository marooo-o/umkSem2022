'use strict';

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: [String]
    },
    confirmed: {
        required: true,
        type: Boolean
    },
    name: {
        required: true,
        type: String
    },
    authority: {
        required: false,
        type: String
    }
}, {
    collection: 'user',
});

module.exports = mongoose.model('User', dataSchema);
