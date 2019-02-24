const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

app.use("/blockchain", require("./controllers/blockchain"));
app.use("/transaction", require("./controllers/transaction"));
app.use("/mine", require("./controllers/mine"));

app.listen(PORT, () => {
  console.log("server is running");
});
