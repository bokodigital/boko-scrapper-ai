const express = require('express');
const router = express.Router();
const { exportToGoogleSheets } = require('../controllers/ExportController');

router.post('/google-sheets', exportToGoogleSheets);

module.exports = router; 