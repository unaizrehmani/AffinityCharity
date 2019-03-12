const express = require("express");
const router = express.Router();
const multipartMiddleware = require("connect-multiparty")();
const postController = require("../controllers/posts");

//POST routes
router.post("/", multipartMiddleware, postController.insertPost);

module.exports = router;
