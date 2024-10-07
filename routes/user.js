const express=require('express');
const { handelUserSignup ,handelUserLogin, handelGetLogin} = require('../controllers/user');

const router=express.Router();



router.post("/",handelUserSignup)
router.post("/login",handelUserLogin)
router.get("/login",handelGetLogin)

module.exports=router;
