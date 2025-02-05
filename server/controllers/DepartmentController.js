const DepartmentModel = require("../models/DepartmentModel");

const getAllData = async (req, res) => {
    try {
        const departments = await DepartmentModel.find({});
        res.status(200).json({data:departments,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const addData = async (req, res) => {
    try {
        const department =  DepartmentModel({...req.body});
        await department.save();
        res.status(201).json({data:department,message:"Succes"})
    } catch (error) {
        res.status(400).json({message:"Bad Request"})
    }
}
const getDataByid = async (req, res) => {
    const {id} = req.params;
    try {
        const department = await DepartmentModel.findById(id);
        res.status(200).json({data:department,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const deleteDataById = async (req, res) => {
    const {id} = req.params;
    try {
        const department = await DepartmentModel.findByIdAndDelete(id);
        res.status(200).json({data:department,message:"Succes"})
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