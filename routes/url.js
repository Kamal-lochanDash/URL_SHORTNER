const express= require("express");
const URL=require("../models/url")
const { handelGenerateNewShortURL,handelRedirectURL, handelGetAnalytics } = require("../controllers/url");

const router= express.Router()


router.post("/",handelGenerateNewShortURL)

router.get("/:shortId",handelRedirectURL)
router.get("/analytics/:shortId",handelGetAnalytics)




module.exports=router;