const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;

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
    app.listen(PORT, () => {
      console.log(`server listening on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
