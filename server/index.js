const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Config information (for hosting on cloud later)
const DB_NAME = process.env.DB_NAME || "test";
const DB_USER = process.env.DB_USER || "unaizrehmani";
const DB_PASSWORD = process.env.DB_PASSWORD || "iv5RL35QNJ3NHLRF";
const PORT = process.env.PORT || 8000;

// put the routes here
app.use("/users", require("./routes/users"));

// put the db connection here
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
