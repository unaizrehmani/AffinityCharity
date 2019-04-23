require('dotenv/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sanitizeMongo = require('express-mongo-sanitize');
const cors = require('cors');

const PORT = process.env.PORT;

const app = express();

// MIDDLEWARE
app.use(express.static(path.join(__dirname, '/../../../public')));
app.use(sanitizeMongo());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.use('/api', require('../routes/api'));
app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});

module.exports = app;
