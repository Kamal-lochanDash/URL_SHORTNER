

const shortID=require("shortid")

const URL= require("../models/url");
const shortid = require("shortid");


async function  handelGenerateNewShortURL(req,res) {
    const body=req.body;
    if(!body.url){
        return res.render("realHome",{
            NoUrl:"please enter any Valid Url"
        })
    } 
    const shortID=shortid(8);
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory:[],
        createdBy:req.user.id,
    });

   return res.render("realHome",{
    id:shortID,
   })
   
   // return res.json({id: shortID})

}

async function handelRedirectURL(req,res) {
    const shortID=req.params.shortId;
    const entry=  await URL.findOneAndUpdate({shortID},{$push:{visitHistory:{timestamp:Date.now()}}})

res.redirect(entry?.redirectURL)
};


async function handelGetAnalytics(req,res) {
    const shortID=req.params.shortId;
   const entry= await URL.findOne({shortID});

   return res.json({
    totalClicks:entry.visitHistory.length,
    analytics:entry.visitHistory
})
}

async function  hadeltestcase(req,res) {

    const allURLS= await URL.find({});

    return res.render('home',{
        urls: allURLS,
    })

  //  res.json({working:"rand"});
}

module.exports={
    handelGenerateNewShortURL,
    handelRedirectURL,
    handelGetAnalytics,
    hadeltestcase
    
}