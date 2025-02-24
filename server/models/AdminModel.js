const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    email:{type:String,default:null},
    password:{type:String,default:null},
    role:{type:String,default:"admin"}
  },
  { versionKey: false, timestamps: true }
);

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
