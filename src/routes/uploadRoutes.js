const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
    uploadImage,
    getUploadedImage,
} = require("../controllers/uploadController");

router.post(
    "/upload",
    upload.single("image"),
    uploadImage
);

router.get(
    "/uploads/:imageId",
    getUploadedImage
);

module.exports = router;