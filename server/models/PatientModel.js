const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    fName: { type: String, required: true },
    mName: { type: String, required: true },
    birthday: { type: String, required: true },
    fin: { type: String, required: true, unique: true },
    shadetname: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    adress: { type: String, required: true },
    password: { type: String, default: null },
    email: { type: String, default: null },
    role: { type: String, default: "user" },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctors", 
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospitals",
    },
    checkupHistory: [],
    vaccines: [],
    appeals: [],
  },
  { versionKey: false, timestamps: true }
);

const PatientModel = mongoose.model("Patients", PatientSchema);

module.exports = PatientModel;
