const {loginDoctor,registerDoctor,doctorAuthentication} = require("../controllers/authDoctorController");
const express = require('express')
const router = express.Router();

router.post('/doctor_authentication',doctorAuthentication);
router.post('/doctor_login',loginDoctor);

module.exports = router;