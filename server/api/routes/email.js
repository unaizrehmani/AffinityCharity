const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email');
const multiPartMiddleware = require('connect-multiparty')();

router.post('/send-email', multiPartMiddleware, emailController.sendEmail);

module.exports = router;
