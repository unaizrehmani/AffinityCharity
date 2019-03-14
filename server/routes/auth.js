const express = require("express");
const router = express.Router();
const sanitizeBody = require("../middleware/sanitizeBody");
const authController = require("../controllers/auth");

router.post("/token", sanitizeBody, authController.authToken);

module.exports = router;
