'use strict';

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    },
    author: {
        required: true,
        type: String
    }
}, {
    collection: 'news',
    versionKey: false
});

module.exports = mongoose.model('News', dataSchema);
