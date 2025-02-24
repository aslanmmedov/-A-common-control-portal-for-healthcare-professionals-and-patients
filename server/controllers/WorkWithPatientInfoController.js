const PatientModel = require("../models/PatientModel");

const addMessage = async (req, res) => {
  const { id } = req.params; 
  const {message, sendByWho} = req.body
  const newMessage = {
    message,
    date: new Date(),
    sendByWho,
  }
  try {
    const uptadedPatient = await PatientModel.findByIdAndUpdate(
      id,
      {
        $push: { messages: newMessage }
      },
      { new: true }
    );
    if(!uptadedPatient){
        return res.status(404).json({ message: "Patient not found!" });
    }
    res.json({
        message: "Message added succesfuly",
        uptadedPatient: uptadedPatient,
      });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const deleteMessage = async (req, res) => {
  const {id} = req.params;
  const { messageId } = req.body;

  try {
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      {
        $pull: { messages: { _id: messageId } }
      },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    res.json({
      message: "Message deleted successfully",
      updatedPatient: updatedPatient,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addPrescription = async (req, res) => {
    const { id } = req.params; 
    const {diagnosis, prescriptionContent,doctorId} = req.body
    const newPrescription = {
      diagnosis,
      date: new Date(),
      prescriptionContent,
      doctorId
    }
    try {
      const uptadedPatient = await PatientModel.findByIdAndUpdate(
        id,
        {
          $push: { messages: newPrescription }
        },
        { new: true }
      );
      if(!uptadedPatient){
          return res.status(404).json({ message: "Patient not found!" });
      }
      res.json({
          message: "Prescription added succesfuly",
          uptadedPatient: uptadedPatient,
        });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
const deletePrescription = async (req, res) => {
    const {id} = req.params;
    const { prescriptionId } = req.body;
  
    try {
      const updatedPatient = await PatientModel.findByIdAndUpdate(
        id,
        {
          $pull: { messages: { _id: prescriptionId } }
        },
        { new: true }
      );
  
      if (!updatedPatient) {
        return res.status(404).json({ message: "Patient not found!" });
      }
  
      res.json({
        message: "Prescription deleted successfully",
        updatedPatient: updatedPatient,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  const addCheckupHistory = async (req, res) => {
    const { id } = req.params; 
    const {diagnosis, doctorId} = req.body
    const newCheckup = {
      diagnosis,
      date: new Date(),
      doctorId,
    }
    try {
      const uptadedPatient = await PatientModel.findByIdAndUpdate(
        id,
        {
          $push: { messages: newCheckup}
        },
        { new: true }
      );
      if(!uptadedPatient){
          return res.status(404).json({ message: "Patient not found!" });
      }
      res.json({
          message: "CheckUp added succesfuly",
          uptadedPatient: uptadedPatient,
        });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
  const AddVaccine = async (req, res) => {
    const { id } = req.params; 
    const {status} = req.body;
    const newVaccine = {
      status,
      date: new Date(),
    }
    try {
      const uptadedPatient = await PatientModel.findByIdAndUpdate(
        id,
        {
          $push: { messages: newVaccine}
        },
        { new: true }
      );
      if(!uptadedPatient){
          return res.status(404).json({ message: "Patient not found!" });
      }
      res.json({
          message: "Vaccine added succesfuly",
          uptadedPatient: uptadedPatient,
        });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
  const AddAppeals = async (req, res) => {
    const { id } = req.params; 
    const {status,appeal} = req.body
    const newAppeal = {
      status,
      appeal,
      date: new Date(),
    }
    try {
      const uptadedPatient = await PatientModel.findByIdAndUpdate(
        id,
        {
          $push: { messages: newAppeal}
        },
        { new: true }
      );
      if(!uptadedPatient){
          return res.status(404).json({ message: "Patient not found!" });
      }
      res.json({
          message: "Appeal added succesfuly",
          uptadedPatient: uptadedPatient,
        });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
  const deleteAppeal = async (req, res) => {
    const {id} = req.params;
    const { messageId } = req.body;
  
    try {
      const updatedPatient = await PatientModel.findByIdAndUpdate(
        id,
        {
          $pull: { appeals: { _id: messageId } }
        },
        { new: true }
      );
  
      if (!updatedPatient) {
        return res.status(404).json({ message: "Patient not found!" });
      }
  
      res.json({
        message: "Message deleted successfully",
        updatedPatient: updatedPatient,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
module.exports = {addMessage,addPrescription,addCheckupHistory,AddVaccine,AddAppeals,deleteMessage,deletePrescription,deleteAppeal}