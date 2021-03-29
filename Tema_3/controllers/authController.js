const { StatusCodes, RESET_CONTENT } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const { signToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken');

const login = function(req,res) {

}

const register = function(req,res) {
    
}   

module.exports = {
    register,
    login
}