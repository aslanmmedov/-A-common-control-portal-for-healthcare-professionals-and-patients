const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    fName: { type: String, required: true },
    mName: { type: String, required: true },
    birthday: { type: Date, required: true },
    fin: { type: String, required: true, unique: true },
    shadetname: { type: String, required: true,unique: true },
    phoneNumber: { type: Number, required: true },
    adress: { type: String, required: true },
    password: { type: String, default: null },
    email: { type: String, default: "@gmail.com" },
    gender:{type:String,required:true},
    role: { type: String, default: "user" },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctors", 
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospitals",
    },
    checkupHistory: [
      {
        date:{type:Date,default:null},
        diagnosis:{type:String,default:null},
        doctorId:{type:String,default:null}
      }
    ],
    prescriptions:[
      {
        date:{type:Date,default:null},
        diagnosis:{type:String,default:null},
        prescriptionContent:{type:String,default:null},
        doctorId:{type:String,default:null}
      }
    ],
    vaccines: [
      {
        name:{type:String,default:null},
        date:{type:Date,default:null},
        status:{type:Boolean,default:false}
      }
    ],
    appeals: [
      {
        appeal:{type:String,default:null},
        status:{type:String,default:"Gözləmədə"},
        date:{type:Date,default:null}
      }
    ],
    messages: [
      {
        message:{type:String,default:null},
        date:{type:Date,default:null},
        sendByWho:{type: mongoose.Schema.Types.ObjectId,ref: "Doctors",}
      }
    ],
    documents:[
      {
        document:{type:String,default:null}
      }
    ]
  },
  { versionKey: false, timestamps: true }
);

const PatientModel = mongoose.model("Patients", PatientSchema);

module.exports = PatientModel;
