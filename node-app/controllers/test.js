'use strict';

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());


// generates token for test purposes
app.post('/login', (req, res) => {
    const token = jwt.sign(
        {
            id: 20,
            email: 'test@example.com',
            name: "somename"
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: "2h",
        }
    );
    return res.status(200).json({token: token});
});

module.exports = app;
