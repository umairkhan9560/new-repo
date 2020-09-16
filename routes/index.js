const express= require('express');
const router= express.Router();

const user= require('./userRoute/userRoute');
router.use('/user', user)

module.exports= router;

