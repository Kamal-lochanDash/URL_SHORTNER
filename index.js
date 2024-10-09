const express= require("express");
const path=require("path")
const {connectToMongoDB}= require("./connection")
const urlRoute= require("./routes/url")
const staticRouter=require("./routes/staticRouter")
const userRouter=require("./routes/user")
const app= express();
const port=8001;
const cookieParser= require("cookie-parser");
const{restrictToLoggedinUserOnly}=require("./middlewares/auth")

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")


app.set("view engine","ejs")
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/",staticRouter)
app.use("/url",restrictToLoggedinUserOnly,urlRoute)
app.use("/user",userRouter)






app.listen(port,()=>console.log(`Server running at port : ${port}`))