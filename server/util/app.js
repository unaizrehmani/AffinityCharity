const express = require('express');
const bodyParser = require('body-parser');
const sanitizeMongo = require('express-mongo-sanitize');
const cors = require('cors');

const PORT = process.env.PORT;

const app = express();

//MIDDLEWARE
app.use(express.static('public'))
app.use(sanitizeMongo());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.use('/api', require('../routes/api'));
app.listen(PORT, () => {

});

module.exports = app