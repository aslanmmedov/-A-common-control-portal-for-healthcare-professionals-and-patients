const DoctorModel = require("../models/DoctorModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require('dotenv').config()
const doctorAuthentication = async (req, res) => {
  const { fin } = req.body;
  try {
    const doctor = await DoctorModel.findOne({ fin });
    if(doctor.password !== null){
      return res.json({message:"You already have an account!"})
    }
    res.status(201).json({ data: doctor._id, message: "Succes" });
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const registerDoctor = async (req, res) => {
  const {id} = req.params;
  const { email, password } = req.body;
  try {
    const existDoctor = await DoctorModel.findOne({ email });
    if (existDoctor) {
      return res
        .status(400)
        .json({ message: "User already exist with this email!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const doctor = await DoctorModel.findByIdAndUpdate(id, {
      ...req.body,
      email,
      password: hashedPassword,
    });
    
    res.status(200).json({ data: doctor, message: "Succesfuly registered" });
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const existDoctor = await DoctorModel.findOne({ email });
    console.log(existDoctor);
    if (
      !existDoctor ||
      !(await bcrypt.compare(password, existDoctor.password))
    ) {
      return res
        .status(404)
        .json({ message: "Email or Password is not correct" });
    }

    const token = jwt.sign(
      {
        id:existDoctor._id,role:existDoctor.role,duty:existDoctor.duty
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ data: existDoctor, token, message: "Login succesfully complated" });
  } catch (error) {}
};
module.exports = {
  doctorAuthentication,
  registerDoctor,
  loginDoctor,
};
