const express = require('express');
const router = express.Router();
const { contactUsController } = require('../controllers/ContactUs');

// Use the post method and provide the callback function
router.post('/contact', contactUsController);

module.exports = router;