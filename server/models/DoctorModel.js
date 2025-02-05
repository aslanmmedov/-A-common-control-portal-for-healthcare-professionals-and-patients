const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    fName: { type: String, required: true },
    birthday: { type: Date, required: true },
    fin: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    adress: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: Number, required: true },
    role: { type: String, default: "user" },
    duty: { type: String, require: true },
    dateOfEmployment: { type: Date, required: true },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospitals" },
    departmentId: {type: mongoose.Schema.Types.ObjectId, ref: "Departments"}
  },
  { versionKey: false, timestamps: true }
);

const DoctorModel = mongoose.model("Doctors", DoctorSchema);

module.exports = DoctorModel;
