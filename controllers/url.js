

const shortID=require("shortid")

const URL= require("../models/url");
const shortid = require("shortid");


async function  handelGenerateNewShortURL(req,res) {
    const body=req.body;
    if(!body.url){
        return res.status(400).json({Error: "url is required"})
    } 
    const shortID=shortid(8);
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory:[]
        
    });

    return res.json({id: shortID})

}




module.exports={
    handelGenerateNewShortURL,
}