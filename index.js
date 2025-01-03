const express= require("express");
const path=require("path")
const {connectToMongoDB}= require("./connection")
const urlRoute= require("./routes/url")
const staticRouter=require("./routes/staticRouter")
const userRouter=require("./routes/user")
const app= express();
const port=8001;
require('dotenv').config();
const cookieParser= require("cookie-parser");
const{restrictToLoggedinUserOnly,checkAuth,restrictedTo}=require("./middlewares/auth")

connectToMongoDB(process.env.MONGODB_URL)


app.set("view engine","ejs")
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/",checkAuth,staticRouter) // here we use checkAuth because we need user req property in the static request
app.use("/url",restrictToLoggedinUserOnly,restrictedTo(["NORMAL","ADMIN"]),urlRoute)
app.use("/user" ,userRouter)






app.listen(port,()=>console.log(`Server running at port : ${port}`))