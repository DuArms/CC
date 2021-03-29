const isEmpty = require('lodash.isempty');
const { validationResult }  = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const checkValidatorRules = function(req,res,next) {
    console.log(req.body);
    if(isEmpty(req.body)) {
        const response = {status:'failed',message:'Body can not be empty'}
        res.status(StatusCodes.UNPROCESSABLE_ENTITY);
        res.end(JSON.stringify(response));
    } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            const errorsToBody = errors.array();
            const response = {status:'failed',message:'Error '+ errorsToBody[0]['msg']};
            res.status(StatusCodes.BAD_REQUEST);
            res.end(JSON.stringify(response));
        } else {
            next();
        }
    }
}


const checkJSONContentTypeHeader = function(req,res,next) {
    if(!req.is('application/json')) {
        const response = {status:'faield',message:"Content-Type not set to application/json,unsupported media type"};
        res.status(StatusCodes.UNSUPPORTED_MEDIA_TYPE);
        res.end(JSON.stringify(response));
    } else {
        next();
    }
}

const checkAuthorizationHeader = function(req,res,next) {
    if(req.header['authorization'] === undefined) {
        const response = {status:'faield',message:"Authorization header not set"};
        res.status(StatusCodes.BAD_REQUEST);
        res.end(JSON.stringify(response));
    } else {
        next();
    }
}


module.exports = {
    checkJSONContentTypeHeader,
    checkAuthorizationHeader,
    checkValidatorRules,
}