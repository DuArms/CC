const routerAPI = require('express').Router();

const auth = require('./auth');

routerAPI.use('/auth',auth);

module.exports = {
    routerAPI
}