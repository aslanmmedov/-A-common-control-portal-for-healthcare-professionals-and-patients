const express = require('express');
const router = express.Router();

const{
    addPrescription,
} = require("../controllers/WorkWithPatientInfoController");

router.put('/pp/:id',addPrescription);


module.exports = router;