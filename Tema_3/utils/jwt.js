const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const JWT_SECRET = 'jVK63H0SJ8';

require('dotenv').config()

const signToken = function(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        algorithm : "HS256",
        expiresIn: 86400
    });
}

const verifyToken = function(req,res) {
    try {
        const token = req.headers('authorization');
        payload = jwt.verify(token,JWT_SECRET);
        res.locals.authToken = payload;

    } catch(err) {
        const response = {status:'failed',message:'Unauthorized request'};
        res.status(StatusCodes.UNAUTHORIZED);
        res.end(JSON.stringify(response));
    }
}   

module.exports = {
    signToken,
    verifyToken
}