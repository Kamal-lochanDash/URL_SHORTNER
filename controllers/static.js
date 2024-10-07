const URL=require("../models/url")


async function handelHomepage(req,res) {
    const allURLS= await URL.find({});
    return res.render("realHome",{
        urls:allURLS
    })
}

async function handelLandingpage(req,res) {
    return res.render("landing");
}


async function hadelsignupPage(req,res) {
   return res.render("signup");
}



module.exports={
    handelHomepage,
    hadelsignupPage,
    handelLandingpage
}