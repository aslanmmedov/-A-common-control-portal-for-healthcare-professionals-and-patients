const express = require('express');
const router = express.Router();

const{
    getAllData,
    getDataByid,
    addData,
    deleteDataById,
} = require("../controllers/PatientController");
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',authMiddleware(["admin"]),getAllData);
router.get('/:id',getDataByid);
router.delete('/:id',deleteDataById);
router.post('/',addData);

module.exports = router;