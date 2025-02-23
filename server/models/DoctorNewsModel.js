const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorNewsSchema = new Schema(
  {
    name: { type: String, required: true },
    description:{type:String,required:true},
    date:{type:Date,default:new Date()}
  },
  { versionKey: false, timestamps: true }
);

const DoctorNewsModel = mongoose.model("DoctorNews", DoctorNewsSchema);

module.exports = DoctorNewsModel;
