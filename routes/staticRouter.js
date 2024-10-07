const express= require("express");
const { handelHomepage, hadelsignupPage, handelLandingpage } = require("../controllers/static");
const router= express.Router()


router.get("/",handelLandingpage)
router.get("/home",handelHomepage)
router.get("/signup",hadelsignupPage)
module.exports=router;