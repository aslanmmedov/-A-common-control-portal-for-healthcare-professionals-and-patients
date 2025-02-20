const {loginPatient,registerPatient,patientAuthentication} = require("../controllers/authPatientController");
const express = require('express')
const router = express.Router();

router.post('/patient_authentication',patientAuthentication);
router.post('/patient_login',loginPatient);

module.exports = router;