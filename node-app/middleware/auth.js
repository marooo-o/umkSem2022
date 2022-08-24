'use strict';

const jwt = require("jsonwebtoken");
const User = require('./../models/user.js');

exports.loggedin = (req, res, next) => {
    if (req.headers['authorization'] === undefined){
        return res.status(403).send("A token is required for authentication");
    }

    const bearerToken = req.headers['authorization'].split(' ')[1];

    try {
        const decoded = jwt.verify(bearerToken, process.env.TOKEN_SECRET);
        User.findOne({email: decoded.sub.split('_')[1]}, (err, result) => {
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }

            if(result == null){
                return res.sendStatus(404);
            }

            req.user = result;
            return next();
        })
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

exports.admin = (req, res, next) => {
    if(req.user.authority != "ROLE_ADMIN"){
        return res.sendStatus(401);
    }

    return next();
};
