const PatientModel = require("../models/PatientModel");

const getAllData = async (req, res) => {
    try {
        const patients = await PatientModel.find({});
        res.status(200).json({data:patients,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const addData = async (req, res) => {
    try {
        const patients =  PatientModel({...req.body});
        await patients.save();
        res.status(201).json({data:patients,message:"Succes"})
    } catch (error) {
        res.status(400).json({message:error})
    }
}
const getDataByid = async (req, res) => {
    const {id} = req.params;
    try {
        const patient = await PatientModel.findById(id);
        res.status(200).json({data:patient,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const deleteDataById = async (req, res) => {
    const {id} = req.params;
    try {
        const patient = await PatientModel.findByIdAndDelete(id);
        res.status(200).json({data:patient,message:"Succes"})
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