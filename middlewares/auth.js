
const {getUser}= require("../Services/auth")
async function restrictToLoggedinUserOnly(req,res,next) {
    const userUid=req.cookies?.uid;
   

    if(!userUid){
        return res.redirect("/user/login")
    }
     const user=getUser(userUid);
     

     if(!user){
        return res.redirect("/user/login");
     }
     req.user=user;
     next();
    
}

async function checkAuth(req,res,next) {
    const userUid=req.cookies?.uid;
     const user=getUser(userUid);
     req.user=user;
     next();
    
}


function restrictedTo(roles=[]){
    return function (req,res,next){
        if(!req.user){
            return res.redirect("/user/login")
        } 
      
        if(!roles.includes(req.user.role)){
            return res.end("you are un authorised");
        }

      return  next();   
    }
}


module.exports={
    restrictToLoggedinUserOnly,
    checkAuth,
    restrictedTo
}