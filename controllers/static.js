const URL=require("../models/url")


async function handelHomepage(req,res) {
    const allURLS= await URL.find({});
    return res.render("realHome",{
        urls:allURLS
    })
}



module.exports={
    handelHomepage,
}