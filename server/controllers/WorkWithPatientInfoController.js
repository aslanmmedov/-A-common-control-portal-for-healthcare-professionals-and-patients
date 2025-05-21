const PatientModel = require("../models/PatientModel");

const AddAppeals = async (req, res) => {
  const { id } = req.params;
  const { status, appeal } = req.body;
  
  const newAppeal = {
    appeal,
    status,
    date: new Date(),
  };
  try {
    const uptadedPatient = await PatientModel.findByIdAndUpdate(
      id,
      {
        $push: { appeals: newAppeal },
      },
      { new: true }
    );
    if (!uptadedPatient) {
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
// const deleteAppeal = async (req, res) => {
//   const { id } = req.params;
//   const { appealId } = req.body;

//   try {
//     const updatedPatient = await PatientModel.findByIdAndUpdate(
//       id,
//       {
//         $pull: { appeals: { _id: appealId } },
//       },
//       { new: true }
//     );

//     if (!updatedPatient) {
//       return res.status(404).json({ message: "Patient not found!" });
//     }
//     res.json({
//       message: "Appeal deleted successfully",
//       updatedPatient: updatedPatient,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const deleteAppeal = async (req, res) => {
  const { id } = req.params;
  const { appealId } = req.body;

  try {
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      {
        $pull: { appeals: { _id: appealId } },
      },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found!" });
    }
    res.json({
      message: "Appeal deleted successfully",
      updatedPatient: updatedPatient,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addMessage = async (req, res) => {
  const { id } = req.params;
  const { message, sendByWho } = req.body;
  const newMessage = {
    message,
    date: new Date(),
    sendByWho,
  };
  try {
    const uptadedPatient = await PatientModel.findByIdAndUpdate(
      id,
      {
        $push: { messages: newMessage },
      },
      { new: true }
    );
    if (!uptadedPatient) {
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
  const { id } = req.params;
  const { messageId } = req.body;

  try {
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      {
        $pull: { messages: { _id: messageId } },
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
  const { diagnosis, prescriptionContent, doctorId } = req.body;
  console.log(diagnosis);
  
  const newPrescription = {
    date: new Date(),
    diagnosis,
    prescriptionContent,
    doctorId,
  };
  try {
    const uptadedPatient = await PatientModel.findByIdAndUpdate(
      id,
      {
        $push: { prescriptions: newPrescription },
      },
      { new: true }
    );
    if (!uptadedPatient) {
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
  const { id } = req.params;
  const { prescriptionId } = req.body;

  try {
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      {
        $pull: { messages: { _id: prescriptionId } },
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
  const { diagnosis, doctorId } = req.body;
  const newCheckup = {
    diagnosis,
    date: new Date(),
    doctorId,
  };
  try {
    const uptadedPatient = await PatientModel.findByIdAndUpdate(
      id,
      {
        $push: { messages: newCheckup },
      },
      { new: true }
    );
    if (!uptadedPatient) {
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
  const { status } = req.body;
  const newVaccine = {
    status,
    date: new Date(),
  };
  try {
    const uptadedPatient = await PatientModel.findByIdAndUpdate(
      id,
      {
        $push: { messages: newVaccine },
      },
      { new: true }
    );
    if (!uptadedPatient) {
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
module.exports = {
  addMessage,
  addPrescription,
  addCheckupHistory,
  AddVaccine,
  AddAppeals,
  deleteMessage,
  deletePrescription,
  deleteAppeal,
};
