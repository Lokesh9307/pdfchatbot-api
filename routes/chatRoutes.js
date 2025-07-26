const express = require('express');
const multer = require('multer');
const { handleChatWithPDF } = require('../controllers/chatController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), handleChatWithPDF);

module.exports = router;  // ✅ Correct export
