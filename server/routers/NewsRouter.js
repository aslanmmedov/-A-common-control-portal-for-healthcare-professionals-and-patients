const express = require('express');
const router = express.Router();

const{
    getAllData,
    getDataByid,
    addData,
    deleteDataById,
} = require("../controllers/NewsController");
const { newsImageUpload } = require('../middlewares/imageUploadMulter');

router.get('/',getAllData);
router.get('/:id',getDataByid);
router.delete('/:id',deleteDataById);
router.post(
    "/",
    newsImageUpload.single("image"),
    addData
  );

module.exports = router;