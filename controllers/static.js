const URL=require("../models/url")
const USER= require("../models/user");


async function handelHomepage(req,res) {
    
    if(!req.user) return res.redirect("/user/login")
        //console.log(req.user?.role)
    if(req?.user?.role=="ADMIN"){
        const allURLS= await URL.find({createdBy:req.user.id});
        const user= await USER.find({_id:req.user.id})
        const name=user[0].name;
        return res.render("realHome",{
            urls:allURLS,
            name,
            isAdmin:true
        })
    }else{
        const allURLS= await URL.find({createdBy:req.user.id});
        const user= await USER.find({_id:req.user.id})
        const name=user[0].name;
        return res.render("realHome",{
            urls:allURLS,
            name,
            isAdmin:false
        })
    }
   
}

async function handelLandingpage(req,res) {
    if(req.user){
        return res.redirect("/home")
    }else{
        return res.render("landing");
    }
    
}


async function hadelsignupPage(req,res) {
   return res.render("signup");
}


async function handelLogout(req,res) {
    res.cookie("uid"," ",{maxAge:1})
    return res.redirect("/");
}

module.exports={
    handelHomepage,
    hadelsignupPage,
    handelLandingpage,
    handelLogout
}