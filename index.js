const express= require("express");
const {connectToMongoDB}= require("./connection")
const urlRoute= require("./routes/url")
const app= express();
const port=8001;


connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
app.use(express.urlencoded({extended:false}));

app.use("/",urlRoute)

app.listen(port,()=>console.log(`Server running at port : ${port}`))