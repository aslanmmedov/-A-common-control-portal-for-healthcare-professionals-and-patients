const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HospitalSchema = new Schema(
  {
    name: { type: String, required: true },
    adress: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const HospitalModel = mongoose.model("Hospitals", HospitalSchema);

module.exports = HospitalModel;
