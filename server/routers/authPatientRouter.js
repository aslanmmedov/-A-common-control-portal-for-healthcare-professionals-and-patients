const {loginPatient,registerPatient,patientAuthentication} = require("../controllers/authPatientController");
const express = require('express')
const router = express.Router();

router.post('/authentication',patientAuthentication);
router.put('/patient_registiration',registerPatient);
router.post('/patient_login',loginPatient);

module.exports = router;