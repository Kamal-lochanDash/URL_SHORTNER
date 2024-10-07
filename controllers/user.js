
const User= require("../models/user")

async function handelUserSignup(req,res) {
    const {name,email,password}=req.body;

    await User.create({
        name:name,
        email: email,
        password: password
    })

    return res.redirect("/home")
};

async function handelUserLogin(req,res) {
    const {email,password}= req.body;

   const user= await User.findOne({email,password});

   if(!user){
    return res.render("login",{
        error:"invalid Email or Password",
    })
   }

   return res.redirect("/home")
};

async function handelGetLogin(req,res) {
    return res.render("login")
}

module.exports={
    handelUserSignup,
    handelUserLogin,
    handelGetLogin
}