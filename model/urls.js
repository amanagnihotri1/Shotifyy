const {nanoid}=require("nanoid");
const mongoose=require("mongoose");
const urlschema=new mongoose.Schema(
  {  originalLink:
    {
        type:String,
        required:true,
    },
    shortLink:
    {
        type:String,
        default:nanoid(),
        required:true
    },
clicks:
{
    type:Number,
    default:0,
    required:true
}
});
const urlshortner=mongoose.model("urlshortner",urlschema);
module.exports=urlshortner;