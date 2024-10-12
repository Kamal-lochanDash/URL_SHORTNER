const express= require("express");
const { handelHomepage, hadelsignupPage, handelLandingpage, handelLogout } = require("../controllers/static");
const router= express.Router()


router.get("/",handelLandingpage)
router.get("/home",handelHomepage)
router.get("/signup",hadelsignupPage)
router.get("/logout",handelLogout)
module.exports=router;