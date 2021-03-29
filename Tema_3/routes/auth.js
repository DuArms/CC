const router = require('express').Router();

const { authController } = require('../controllers');

router.get('/',(req,res) =>{
    res.send({status:'MERGE FRATELE DIN CER 2'});
})

module.exports = router;