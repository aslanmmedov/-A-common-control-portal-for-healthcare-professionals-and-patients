const HospitalModel = require("../models/HospitalModel");

const getAllData = async (req, res) => {
    try {
        const hospitals = await HospitalModel.find({});
        res.status(200).json({data:hospitals,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const addData = async (req, res) => {
    try {
        const hospital =  HospitalModel({...req.body});
        await hospital.save();
        res.status(201).json({data:hospital,message:"Succes"})
    } catch (error) {
        res.status(400).json({message:"Bad Request"})
    }
}
const getDataByid = async (req, res) => {
    const {id} = req.params;
    try {
        const hospital = await HospitalModel.findById(id);
        res.status(200).json({data:hospital,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const deleteDataById = async (req, res) => {
    const {id} = req.params;
    try {
        const hospital = await HospitalModel.findByIdAndDelete(id);
        res.status(200).json({data:hospital,message:"Succes"})
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