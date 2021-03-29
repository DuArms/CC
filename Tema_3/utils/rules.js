const { body }  = require('express-validator');

const registerChain = function(){
    return [
        body('email', 'email is required').exists().notEmpty(),
        body('password', 'password parameter is required').exists().notEmpty(),
        body('email','email type not supported').exists().notEmpty().normalizeEmail().isEmail()
    ];
}

const loginChain = function() {
    return [
        body('email', 'email is required').exists().notEmpty(),
        body('password', 'password parameter is required').exists().notEmpty(),
        body('email','email type not supported').exists().notEmpty().normalizeEmail().isEmail()
    ];
}


module.exports = {
    registerChain,
    loginChain,
}