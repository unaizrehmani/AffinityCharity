const express = require('express');
const bodyParser = require('body-parser');
const sanitizeMongo = require('express-mongo-sanitize');
const cors = require('cors');

const app = express();

//MIDDLEWARE
app.use(sanitizeMongo());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// CONFIG
const PORT = process.env.PORT

// ROUTES
app.use('/api', require('../routes/api'));
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;