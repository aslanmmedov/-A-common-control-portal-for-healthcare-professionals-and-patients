const express = require('express');
const router = express.Router();

const{
    getAllData,
    getDataByid,
    addData,
    deleteDataById,
    loginAdmin
} = require("../controllers/adminController");

router.get('/',getAllData);
router.get('/:id',getDataByid);
router.delete('/:id',deleteDataById);
router.post('/',addData);
router.post('/admin_login',loginAdmin);

module.exports = router;