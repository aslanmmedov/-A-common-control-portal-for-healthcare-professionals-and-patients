const DoctorNewsModel = require("../models/DoctorNewsModel");

const getAllData = async (req, res) => {
    try {
        const doctorNews = await DoctorNewsModel.find({});
        res.status(200).json({data:doctorNews,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const addData = async (req, res) => {
    try {
        const doctorNews =  DoctorNewsModel({...req.body});
        await doctorNews.save();
        res.status(201).json({data:doctorNews,message:"Succes"})
    } catch (error) {
        res.status(400).json({message:"Bad Request"})
    }
}
const getDataByid = async (req, res) => {
    const {id} = req.params;
    try {
        const doctorNews = await DoctorNewsModel.findById(id);
        res.status(200).json({data:doctorNews,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const deleteDataById = async (req, res) => {
    const {id} = req.params;
    try {
        const doctorNews = await DoctorNewsModel.findByIdAndDelete(id);
        res.status(200).json({data:doctorNews,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const UpdateDataById = async (req, res) => {
    const {id} = req.params;
    try {
        const doctorNews = await DoctorNewsModel.findByIdAndUpdate(id,{...req.body});
        if (!doctorNews) {
            return res.status(404).json({
              message: "user not found!",
            });
          }
        res.status(200).json({data:doctorNews,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}

module.exports = {
    getAllData,
    getDataByid,
    addData,
    deleteDataById,
    UpdateDataById
}