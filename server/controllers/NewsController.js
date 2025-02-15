const NewsModel = require("../models/NewsModel");

const getAllData = async (req, res) => {
    try {
        const News = await NewsModel.find({});
        res.status(200).json({data:News,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const addData = async (req, res) => {
    try {
        const imageName = req.file.filename;
        const News =  NewsModel({...req.body,image: `http://localhost:8080/${imageName}`,});
        await News.save();
        res.status(201).json({data:News,message:"Succes"})
    } catch (error) {
        res.status(400).json({message:"Bad Request"})
    }
}
const getDataByid = async (req, res) => {
    const {id} = req.params;
    try {
        const News = await NewsModel.findById(id);
        res.status(200).json({data:News,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const deleteDataById = async (req, res) => {
    const {id} = req.params;
    try {
        const News = await NewsModel.findByIdAndDelete(id);
        res.status(200).json({data:News,message:"Succes"})
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