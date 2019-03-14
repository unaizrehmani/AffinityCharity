const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const sanitizeMongo = require("express-mongo-sanitize");

const app = express();

app.use(sanitizeMongo());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let configVars;
try {
  configVars = require("./config.json");
} catch (err) {
  console.log(err);
}

// CONFIG
const DB_NAME = process.env.DB_NAME || configVars.DB_NAME;
const DB_USER = process.env.DB_USER || configVars.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD || configVars.DB_PASSWORD;
const PORT = process.env.PORT || configVars.PORT;

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));

// DB
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-jgsmf.mongodb.net/${DB_NAME}?retryWrites=true`,
    {
      useNewUrlParser: true
    },
    () => {}
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
