'use strict';

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (req.headers['authorization'] === undefined){
        return res.status(403).send("A token is required for authentication");
    }

    const bearerToken = req.headers['authorization'].split(' ')[1];

    try {
        const decoded = jwt.verify(bearerToken, process.env.TOKEN_SECRET);
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};
