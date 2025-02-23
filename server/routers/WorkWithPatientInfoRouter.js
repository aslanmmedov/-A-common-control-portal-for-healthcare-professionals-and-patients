const express = require('express');
const router = express.Router();

const{
    addMessage,
    addPrescription,
    addCheckupHistory,
    AddVaccine,
    AddAppeals,
    deleteMessage,
    deletePrescription
} = require("../controllers/WorkWithPatientInfoController");

router.put('/p/:id',addMessage);
router.put('/p/:id',addPrescription);
router.put('/p/:id',addCheckupHistory);
router.put('/p/:id',AddVaccine);
router.put('/p/:id',AddAppeals);
router.put('/p/:id',deleteMessage);
router.put('/p/:id',deletePrescription);



module.exports = router;