const express = require('express');
const router = express.Router();
const multiPartMiddleware = require('connect-multiparty')();
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');
const authorize = require('../middleware/auth/verifyToken');
const emailController = require('../controllers/email');

router.use(authorize);
router.use(multiPartMiddleware);
router.use(sanitizeBody);

router.post('/', emailController.insertEmail);
router.get('/', emailController.getEmails);
router.get('/:emailID', emailController.getEmailById);
router.delete('/:emailID', emailController.deleteEmailById);

module.exports = router;
