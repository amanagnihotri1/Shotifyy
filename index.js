const dotenv=require("dotenv").config();
const express=require("express");
const bodyParser=require("body-parser");
const nanoid= require("nanoid");
const mongoose=require("mongoose");
const ejs= require("ejs");
const urlshortner= require(__dirname+"/model/urls");
const app= express();
const path= require("path");
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine","ejs");
app.use(express.static("public"));
mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true,useUnifiedTopology:true},(err)=>
{
    if(err)
    {
        console.log("error");
    }
    else
    {
        console.log("successfully connected to server");
    }
});
app.get("/",async(req,res)=>
{
    const s=nanoid();  
 const allUrl=await urlshortner.find();    
res.render(path.join(__dirname+"/public/views/url"),{allurl:allUrl});
});
app.post("/",async(req,res)=>
{ 
   await urlshortner.create({originalLink:req.body.urlopy});
   res.redirect("/");

});
app.get("/:shortUrl",async(req,res)=>
{
const shortUrl= await urlshortner.findOne({shortLink:req.params.shortUrl});   
 if(shortUrl == null)
  return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.originalLink);
});
app.listen(process.env.PORT || 4000,function(err)
{
    if(err)
    {
        console.log("error occured");
    }
    else
    {   
        connect();
        console.log("server started successfully");
    }
});
