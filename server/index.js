const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// put the routes here
app.use("/admin", require("./routes/admin"));

// put the db connection here
mongoose
  .connect(
    "mongodb+srv://unaizrehmani:Mcdonalds1!@cluster0-jgsmf.mongodb.net/test?retryWrites=true",
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`server listening on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
