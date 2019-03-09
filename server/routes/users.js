const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

//POST routes
router.post("/", userController.insertUser);

//GET routes
router.get("/:userID", userController.getUserByID);

//PATCH routes

//DELETE routes

module.exports = router;
