const jwt= require("jsonwebtoken");
const key="Harrypotter2004#"

 function setAdmin(verifier){

    const payload={
        adminVerify:verifier,
    }

   return jwt.sign(payload,key);
}


function getAdmin(token){
    if(!token){
        return null
    }
    try {
        return jwt.verify(token,key);
    } catch (error) {
        return null;
    }

}


module.exports={
    setAdmin,
    getAdmin
}