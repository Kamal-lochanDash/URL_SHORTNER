
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


async function handelValidatePasskey(req,res){
    
    const passKey="Kamaldash2004#"
    const body=req.body;
    console.log(req.user,"Rand")
    const id=req.user?.id;
    console.log(id)
    
    if(body.passkey==passKey){
       // logic to send a cookie for user wo want to be admin
        const user= await User.findOne({_id:id})
        console.log(user);
       await User.findByIdAndUpdate(id,{role:"ADMIN"});
        const userA= await User.findOne({_id:id})
        console.log(userA);
        res.cookie("uid"," ",{maxAge:1})
        return res.render("login",{
            message:"Plese login here to proceed further"
        });

       //what if a admin logins
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