const express = require('express');
const router = express.Router();

const{
    addMessage,
    addCheckupHistory,
    AddVaccine,
    AddAppeals,
    deleteMessage,
    deleteAppeal
} = require("../controllers/WorkWithPatientInfoController");



router.put('/ap/:id',AddAppeals);
router.put('/ap/:id',deleteAppeal);
router.put('/mp/:id',addMessage);
router.put('/cp/:id',addCheckupHistory);
router.put('/vp/:id',AddVaccine);
router.put('/mp/:id',deleteMessage);



module.exports = router;