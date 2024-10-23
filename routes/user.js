const express=require('express');
const { handelUserSignup ,handelUserLogin, handelGetLogin,handelAdmin,handelGetAdminLogin,handelValidatePasskey, handelChooseAdminOption} = require('../controllers/user');
const { restrictedTo} = require('../middlewares/auth');

const router=express.Router();



router.post("/",handelUserSignup)
router.post("/login",handelUserLogin)
router.get("/login",handelGetLogin)
router.post("/admin/validate-passkey",handelValidatePasskey)
router.get("/admin/login",restrictedTo(["NORMAL","ADMIN"]),handelGetAdminLogin)
router.get("/admin",restrictedTo(["ADMIN"]),handelAdmin)
router.get("/choose",handelChooseAdminOption)


module.exports=router;
