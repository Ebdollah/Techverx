const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config(); // Ensure this is present

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const { name, description } = req.body;

    // Check if file is present
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Upload image to Pinata
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const imgRes = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxContentLength: 'Infinity',
        headers: {
          ...formData.getHeaders(),
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
      }
    );

    // Rest of your code...
  } catch (error) {
    console.error('Error in /upload:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
