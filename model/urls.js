const { v4: uuidv4 } = require('uuid');
const v4options = {
    random: [
      0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
    ],
  };
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
        default:uuidv4(v4options),
        required:true,
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