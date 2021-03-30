const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

require('dotenv').config()

const signToken = function(payload, secret) {
    return jwt.sign(payload, secret, {
        algorithm : "HS256",
        expiresIn: 86400
    });
}

const verifyToken = function(req,res) {
    try {
        const token = req.headers('authorization');
        payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
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