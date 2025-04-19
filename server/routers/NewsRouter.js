const express = require('express');
const router = express.Router();

const{
    getAllData,
    getDataByid,
    addData,
    deleteDataById,
    UpdateDataById,
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
router.put("/:id",newsImageUpload.single("image"),UpdateDataById)

module.exports = router;