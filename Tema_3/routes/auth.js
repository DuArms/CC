const router = require('express').Router();

const { authController } = require('../controllers');

router.get('/',(req,res) =>{
    res.send({status:'ok'});
})

module.exports = router;