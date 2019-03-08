const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ name: "example" });
});

router.get("/:id", (req, res) => {
  res.send({ id: req.params.id });
});

module.exports = router;
