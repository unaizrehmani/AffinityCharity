const express = require('express');
const router = express.Router();
const multiPartMiddleware = require('connect-multiparty')();
const userController = require('../controllers/users');
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');
const authorize = require("../middleware/auth/verifyToken");

router.use(sanitizeBody);

/*
 * POST /api/users/
 */
router.post('/', multiPartMiddleware, userController.insertUser);

/*
 * GET /api/users/
 */
router.get('/', userController.getAllUsers);
router.get('/:userID', authorize, userController.getUserByID);

/*
 * PATCH /api/users/
 */
router.patch('/:userID', authorize, multiPartMiddleware, userController.patchUserByID);

/*
 * DELETE /api/users/
 */
router.delete('/:userID', authorize, userController.deleteUserByID);

module.exports = router;