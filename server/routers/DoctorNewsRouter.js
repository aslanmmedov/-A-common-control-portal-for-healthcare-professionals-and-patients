const express = require('express');
const router = express.Router();

const{
    getAllData,
    getDataByid,
    addData,
    deleteDataById,
    UpdateDataById
} = require("../controllers/DoctorNewsController");

router.get('/',getAllData);
router.get('/:id',getDataByid);
router.delete('/:id',deleteDataById);
router.post("/",addData);
router.put("/:id",UpdateDataById)

module.exports = router;