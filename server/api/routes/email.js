const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email');
const multiPartMiddleware = require('connect-multiparty')();
const sample = require('./sample.json');

router.post('/send-email', multiPartMiddleware, emailController.sendEmail);
router.get('/emailDesign', multiPartMiddleware, (req, res, next) => {
  res.status(200).send(sample);
});
module.exports = router;
