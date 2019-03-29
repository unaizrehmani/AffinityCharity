const express = require('express');
const router = express.Router();
const multipartMiddleware = require('connect-multiparty')();
const postController = require('../controllers/posts');
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');
const authorize = require("../middleware/auth/verifyToken");

router.use(authorize);
router.use(sanitizeBody);

/*
 * POST /api/posts/
 */
router.post('/', multipartMiddleware, postController.insertPost);

/*
 * GET /api/posts/
 */
router.get('/:postID', postController.getPostByID);
router.get('/', postController.getAllPosts);

/*
 * PATCH /api/posts/
 */
router.patch('/:postID', multipartMiddleware, postController.patchPostByID);

/*
 * DELETE /api/posts/
 */
router.delete('/:postID', postController.deletePostByID);

module.exports = router;