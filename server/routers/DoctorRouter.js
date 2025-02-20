const express = require('express');
const router = express.Router();

const{
    getAllData,
    getDataByid,
    addData,
    deleteDataById,
} = require("../controllers/DoctorController");
const { registerDoctor } = require('../controllers/authDoctorController');

router.get('/',getAllData);
router.get('/:id',getDataByid);
router.delete('/:id',deleteDataById);
router.post('/',addData);
router.put('/:id',registerDoctor);

module.exports = router;