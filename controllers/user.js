
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
   // console.log(req?.user)
    const {email,password}= req.body;

   const user= await User.findOne({email,password});

   if(!user){
    return res.render("login",{
        error:"invalid Email or Password",
    })
   }

  

  const token= setUser(user);
   res.cookie("uid",token);
  

   //return res.redirect("/home")
   return res.render("choose");
};



async function handelGetAdminLogin(req,res) {
    return res.render("admin")
}

async function handelGetLogin(req,res) {
    return res.render("login")
}


async function handelAdmin(req,res,) {
   const allUser= await User.find({});
   return res.render("dashboard",{
    allUser:allUser
   });
}


async function handelValidatePasskey(req,res){
    
    const passKey="Kamaldash2004#"
    const body=req.body;
    //console.log(req.user?.role,"Rand")
    const id=req.user?.id;
    //console.log(id)
    if(req?.user?.role=="NORMAL"){


        if(body.passkey==passKey){
            // logic to send a cookie for user wo want to be admin
             const user= await User.findOne({_id:id})
            // console.log(user);
            await User.findByIdAndUpdate(id,{role:"ADMIN"});
             const userA= await User.findOne({_id:id})
             console.log(userA);
             res.cookie("uid"," ",{maxAge:1})
             return res.render("login",{
                 message:"Plese login here to proceed further"
             });
         }else{
             return res.render("admin",{
                 error:"The key is not valid"
             })
         }
    }else if(req?.user?.role=="ADMIN"){
        //what if a admin logins
        if(body.passkey==passKey){
            return res.redirect("/user/admin")
        }else{
            return res.render("admin",{
                error:"The key is not valid"
            })
        }
    }
   
   
   

    
}



async function handelChooseAdminOption(req,res) {
    console.log(req?.user?.role,"Nigga")
    if(req?.user?.role=="NORMAL"){
        return res.redirect("/home")
    }else{
        return res.json({stay:true});
    }
   
}


async function handelAdminViewId(req,res) {
   
    const ID=req?.params?.ID;
    console.log(ID);

    const allURLS= await URL.find({createdBy:ID});
    console.log(allURLS)

    const user= await User.find({_id:ID})
    const name=user[0].name;
console.log(name)
    return res.render("viewurls",{
        allURLS:allURLS,
        name:name
    })
}

module.exports={
    handelUserSignup,
    handelUserLogin,
    handelGetLogin,
    handelAdmin,
    handelGetAdminLogin,
    handelValidatePasskey,
    handelChooseAdminOption,
    handelAdminViewId
}