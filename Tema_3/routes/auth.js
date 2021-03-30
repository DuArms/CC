const router = require('express').Router();

const { authController } = require('../controllers');

const { checkJSONContentTypeHeader , checkValidatorRules } = require('../utils/checks');
const { registerChain, loginChain } = require('../utils/rules');
const { logRequest } = require('../utils/logger');

const registerValidations = registerChain();
const loginValidations = loginChain();

const middlewaresRegister = [
    checkJSONContentTypeHeader,
    checkValidatorRules,
    logRequest
];

const middlewaresLogin = [
    checkJSONContentTypeHeader,
    checkValidatorRules,
    logRequest
];


router.post('/register',registerValidations,middlewaresRegister,authController.register);
router.post('/login',loginValidations,middlewaresLogin,authController.login);
router.post('/classrooms');

module.exports = router;