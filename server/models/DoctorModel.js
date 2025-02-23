const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    fName: { type: String, required: true },
    birthday: { type: String, required: true },
    fin: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    adress: { type: String, required: true },
    email: { type: String, default:null },
    password: { type: String, default:null },
    role: { type: String, default: "user" },
    gender:{type:String,required:true},
    duty: { type: String, require: true },
    dateOfEmployment: { type: String, required: true },
    workHours: { type: String, required: true },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospitals" },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Departments" },
    messages:[
      {
        message:{type:String,default:null},
        date:{type:Date,default:null},
        sendByWho:{type:String,default:null}
      }
    ]
  },
  { versionKey: false, timestamps: true }
);

const DoctorModel = mongoose.model("Doctors", DoctorSchema);

module.exports = DoctorModel;
