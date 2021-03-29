const router = require('express').Router();

const { authController } = require('../controllers');

const { checkJSONContentTypeHeader , checkValidatorRules } = require('../utils/checks');
const { registerChain, loginChain, refreshChain } = require('../utils/rules');

const registerValidations = registerChain();
const loginValidations = loginChain();

const middlewaresRegister = [
    checkJSONContentTypeHeader,
    checkValidatorRules
];

const middlewaresLogin = [
    checkJSONContentTypeHeader,
    checkValidatorRules
];


router.post('/register',registerValidations,middlewaresRegister,authController.register);
router.post('/authenticate',loginValidations,middlewaresLogin,authController.login);

module.exports = router;