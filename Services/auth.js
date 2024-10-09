const jwt= require("jsonwebtoken")
const secreat="Kamaldash2004#"
function setUser(user){
   const payload={
    id:user._id,
    email: user.email
   }
   return jwt.sign(payload,secreat)
}

function getUser(token){
    if(!token){
        return null
    }
    try {
        return jwt.verify(token,secreat);
    } catch (error) {
        return null;
    }
  
   
}



module.exports={
    setUser,
    getUser,
   
}