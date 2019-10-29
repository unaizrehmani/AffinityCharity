const express = require('express');
const router = express.Router();
const multiPartMiddleware = require('connect-multiparty')();
const userController = require('../controllers/users');
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');
const authorize = require('../middleware/auth/verifyToken');

router.use(sanitizeBody);
router.use(multiPartMiddleware);
router.use(authorize);
/*
 * POST /api/users/
 */
router.post('/', userController.insertUser);

/*
 * GET /api/users/
 */
router.get('/', userController.getAllUsers);
/*
 * GET /api/users/:userID
 */
router.get('/:userID', userController.getUserByID);

/*
 * PATCH /api/users/
 */
router.patch('/:userID', userController.patchUserByID);

/*
 * DELETE /api/users/
 */
router.delete('/:userID', userController.deleteUserByID);

module.exports = router;
