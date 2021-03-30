const routerAPI = require('express').Router();

const auth = require('./auth');
const classroom = require('./classroom');

routerAPI.use('/auth',auth);
routerAPI.use('/classrooms',classroom);


module.exports = {
    routerAPI
}