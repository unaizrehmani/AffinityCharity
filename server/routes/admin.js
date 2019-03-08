const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.post("/addUser", userController.addUser);
router.get("/getUser/:userID", userController.getUserByID);

module.exports = router;
