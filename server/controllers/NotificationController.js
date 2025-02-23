const NotificationModel = require("../models/NotificationModel");

const getAllData = async (req, res) => {
    try {
        const notification = await NotificationModel.find({});
        res.status(200).json({data:notification,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const addData = async (req, res) => {
    try {
        const notification =  NotificationModel({...req.body});
        await notification.save();
        res.status(201).json({data:notification,message:"Succes"})
    } catch (error) {
        res.status(400).json({message:"Bad Request"})
    }
}
const getDataByid = async (req, res) => {
    const {id} = req.params;
    try {
        const notification = await NotificationModel.findById(id);
        res.status(200).json({data:notification,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const deleteDataById = async (req, res) => {
    const {id} = req.params;
    try {
        const notification = await NotificationModel.findByIdAndDelete(id);
        res.status(200).json({data:notification,message:"Succes"})
    } catch (error) {
        res.status(404).json({message:"Not Found"})
    }
}
const UpdateDataById = async (req, res) => {
    const {id} = req.params;
    try {
        const notification = await NotificationModel.findByIdAndUpdate(id,{...req.body});
        if (!notification) {
            return res.status(404).json({
              message: "user not found!",
            });
          }
        res.status(200).json({data:notification,message:"Succes"})
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