const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sanitizeMongo = require('express-mongo-sanitize');

const app = express();

app.use(sanitizeMongo());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// CONFIG
const MONGO_DB_NAME = process.env.MONGO_DB_NAME
const MONGO_DB_USER = process.env.MONGO_DB_USER
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD
const PORT = process.env.PORT

// ROUTES
app.use('/api', require('./routes/api'));

// DB
mongoose
  .connect(
    `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0-jgsmf.mongodb.net/${MONGO_DB_NAME}?retryWrites=true`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    },
    () => {}
  )
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
    throw err;
  });