const express = require('express');
const router = express.Router();
const multiPartMiddleware = require('connect-multiparty')();
const userController = require('../controllers/users');
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');
const authorize = require("../middleware/auth/verifyToken");

router.use(sanitizeBody);

// POST routes
router.post('/', multiPartMiddleware, userController.insertUser);

// GET routes
router.get('/', authorize, userController.getAllUsers);
router.get('/:userID', authorize, userController.getUserByID);

// PATCH routes
router.patch('/:userID', authorize, multiPartMiddleware, userController.patchUserByID);

// DELETE routes
router.delete('/:userID', authorize, userController.deleteUserByID);

module.exports = router;