const express = require("express");
const router = express.Router();
const multipartMiddleware = require("connect-multiparty")();
const postController = require("../controllers/posts");
const sanitizeBody = require("../middleware/sanitization/sanitizeBody");

router.use(sanitizeBody);

//POST routes
router.post("/", multipartMiddleware, postController.insertPost);

//GET routes
router.get("/:postID", postController.getPostByID);
router.get("/", postController.getAllPosts);

//PATCH routes
router.patch("/:postID", postController.patchPostByID);

//DELETE routes
router.delete("/:postID", postController.deletePostByID);

module.exports = router;
