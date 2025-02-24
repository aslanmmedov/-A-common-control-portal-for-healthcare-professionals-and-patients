const AdminModel = require("../models/AdminModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require('dotenv').config()
const getAllData = async (req, res) => {
    try {
        const admin = await AdminModel.find({});
        res.status(200).json({data:admin,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const addData = async (req, res) => {
    try {
        const admin =  AdminModel({...req.body});
        await admin.save();
        res.status(201).json({data:admin,message:"Succes"})
    } catch (error) {
        res.status(400).json({message:"Bad Request"})
    }
}
const getDataByid = async (req, res) => {
    const {id} = req.params;
    try {
        const admin = await AdminModel.findById(id);
        res.status(200).json({data:admin,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const deleteDataById = async (req, res) => {
    const {id} = req.params;
    try {
        const admin = await AdminModel.findByIdAndDelete(id);
        res.status(200).json({data:admin,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const existAdmin = await AdminModel.findOne({ email });
      console.log(existAdmin);
      
      if (
        !existAdmin ||
        !(await bcrypt.compare(password, existAdmin.password))
      ) {
        return res
          .status(404)
          .json({ message: "Email or Password is not correct" });
      }
  
      const token = jwt.sign(
        {
          id:existAdmin._id,role:existAdmin.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ data: existAdmin, token, message: "Login succesfully complated" });
    } catch (error) {}
  };
module.exports = {
    getAllData,
    getDataByid,
    addData,
    deleteDataById,
    loginAdmin
}