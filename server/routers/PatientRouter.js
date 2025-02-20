const express = require('express');
const router = express.Router();

const{
    getAllData,
    getDataByid,
    addData,
    deleteDataById,
} = require("../controllers/PatientController");
const authMiddleware = require('../middlewares/authMiddleware');
const { registerPatient } = require('../controllers/authPatientController');

router.get('/',getAllData);
router.get('/:id',getDataByid);
router.delete('/:id',deleteDataById);
router.post('/',addData);
router.put('/:id',registerPatient);

module.exports = router;