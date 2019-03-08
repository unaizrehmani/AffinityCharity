const express = require("express");
const router = express.Router();

router.get("/addUser", (req, res, next) => {
  res.send("in add user");
});

module.exports = router;
