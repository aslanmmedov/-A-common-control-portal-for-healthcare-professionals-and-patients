const DoctorModel = require("../models/DoctorModel");

const getAllData = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({});
        res.status(200).json({data:doctors,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const addData = async (req, res) => {
    try {
        const doctor =  DoctorModel({...req.body});
        await doctor.save();
        res.status(201).json({data:doctor,message:"Succes"})
    } catch (error) {
        res.status(400).json({message:"Bad Request"})
    }
}
const getDataByid = async (req, res) => {
    const {id} = req.params;
    try {
        const doctor = await DoctorModel.findById(id);
        res.status(200).json({data:doctor,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const deleteDataById = async (req, res) => {
    const {id} = req.params;
    try {
        const doctor = await DoctorModel.findByIdAndDelete(id);
        res.status(200).json({data:doctor,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}

module.exports = {
    getAllData,
    getDataByid,
    addData,
    deleteDataById,
}