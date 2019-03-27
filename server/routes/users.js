const express = require('express');
const router = express.Router();
const multiPartMiddleware = require('connect-multiparty')();
const userController = require('../controllers/users');
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');

router.use(sanitizeBody);

// POST routes
router.post('/', multiPartMiddleware, userController.insertUser);

// GET routes
router.get('/', userController.getAllUsers);
router.get('/:userID', userController.getUserByID);

// PATCH routes
router.patch('/:userID', multiPartMiddleware, userController.patchUserByID);

// DELETE routes
router.delete('/:userID', userController.deleteUserByID);

module.exports = router;