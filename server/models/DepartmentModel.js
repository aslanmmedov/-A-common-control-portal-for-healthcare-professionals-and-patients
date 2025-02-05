const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema(
  {
    name: { type: String, required: true },
    description: {type:String,required:true}
  },
  { versionKey: false, timestamps: true }
);

const DepartmentModel = mongoose.model("Departments", DepartmentSchema);

module.exports = DepartmentModel;
