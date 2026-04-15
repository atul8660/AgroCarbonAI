const axios = require("axios");

// Upload Image Controller
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const imagePath = req.file.path;

    // Send to AI server
    const response = await axios.post("http://127.0.0.1:8000/process", {
      imagePath: imagePath
    });

    res.json({
      success: true,
      message: "Image uploaded and processed",
      file: req.file.filename,
      result: response.data
    });

  } catch (error) {
    console.error("Upload error:", error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message
    });
  }
};