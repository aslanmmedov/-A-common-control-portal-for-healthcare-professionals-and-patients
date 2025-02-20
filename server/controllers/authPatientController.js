const PatientModel = require("../models/PatientModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require('dotenv').config()
const patientAuthentication = async (req, res) => {
  const { fin, shadetname } = req.body;
  try {
    const patient = await PatientModel.findOne({
      $or: [{ fin }, { shadetname }],
    });
    if(!patient){
      return res.status(200).json({ message: "Fin doğru daxil edilməyib" });
    }
    if(patient.password !== null){
      return res.json({message:"You already have an account!"})
    }
    res.status(201).json({ data: patient._id, message: "Succes" });
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const registerPatient = async (req, res) => {
  const {id} = req.params;
  const { email, password } = req.body;  
  try {
    const existPatient = await PatientModel.findOne({ email });
    if (existPatient) {
      return res
        .status(400)
        .json({ message: "User already exist with this email!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12); 
    const patient = await PatientModel.findByIdAndUpdate(id, {
      ...req.body,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ data: patient, message: "Succesfuly registered" });
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const loginPatient = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existPatient = await PatientModel.findOne({ email });
    if (
      !existPatient ||
      !(await bcrypt.compare(password, existPatient.password))
    ) {
      return res
        .json({ message: "Email or Password is not correct" });
    }

    const token = jwt.sign(
      {
        id:existPatient._id,role:existPatient.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ data: existPatient, token, message: "Login succesfully complated" });
  } catch (error) {}
};
module.exports = {
  patientAuthentication,
  registerPatient,
  loginPatient,
};
