const express = require("express");
const multer = require("multer");

const { uploadImage } = require("../controllers/uploadController");

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Route
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;