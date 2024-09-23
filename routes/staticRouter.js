const express= require("express");
const { handelHomepage } = require("../controllers/static");
const router= express.Router()


router.get("/",handelHomepage)
module.exports=router;