const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    name: { type: String, required: true },
    type:{type:String,required:true}
  },
  { versionKey: false, timestamps: true }
);

const NotificationModel = mongoose.model("Notifications", NotificationSchema);

module.exports = NotificationModel;
