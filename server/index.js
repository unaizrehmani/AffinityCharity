const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;

app.use("/users", require("./controllers/users"));

app.listen(PORT, () => {
  console.log("server is running on PORT:", PORT);
});
