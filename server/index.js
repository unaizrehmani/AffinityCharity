const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;

// put the routes here
app.use("/users", require("./controllers/users"));

// put the db connection here
const MongoConnect = require("./util/database").MongoConnect;

MongoConnect(() => {
  app.listen(PORT, () => {
    console.log("server is running on PORT:", PORT);
  });
});
