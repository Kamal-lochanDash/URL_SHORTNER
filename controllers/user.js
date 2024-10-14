
const URL = require("../models/url");
const User= require("../models/user");
const { setAdmin } = require("../Services/adminAuth");
const {setUser}=require("../Services/auth")

async function handelUserSignup(req,res) {

    const {name,email,password}=req.body;

    await User.create({
        name:name,
        email: email,
        password: password
    })

    return res.redirect("/user/login")
};

async function handelUserLogin(req,res) {
    const {email,password}= req.body;

   const user= await User.findOne({email,password});

   if(!user){
    return res.render("login",{
        error:"invalid Email or Password",
    })
   }

  

  const token= setUser(user);
   res.cookie("uid",token);
  

   return res.redirect("/home")
};



async function handelGetAdminLogin(req,res) {
    return res.render("admin")
}

async function handelGetLogin(req,res) {
    return res.render("login")
}


async function handelAdmin(req,res,) {
    const allURLS= await URL.find({});
    return res.json(allURLS);
}


function handelValidatePasskey(req,res){
    let vrified=false;
    const passKey="Kamaldash2004#"
    const body=req.body;
    
    if(body.passkey==passKey){
       // logic to send a cookie for admin
        vrified=true
        const token= setAdmin(vrified)

        res.cookie("admin",token);
        
        return res.render("test");
    }else{
        return res.render("admin",{
            error:"The key is not valid"
        })
    }
   
   

    
}

module.exports={
    handelUserSignup,
    handelUserLogin,
    handelGetLogin,
    handelAdmin,
    handelGetAdminLogin,
    handelValidatePasskey
}