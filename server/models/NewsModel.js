const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const NewsSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    date:{type:String,required:true},
    news:{type:String,required:true} 
  },
  { versionKey: false, timestamps: true }
);

const NewsModel = mongoose.model("News", NewsSchema);

module.exports = NewsModel;
