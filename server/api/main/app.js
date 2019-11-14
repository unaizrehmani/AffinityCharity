require('dotenv/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sanitizeMongo = require('express-mongo-sanitize');
const cors = require('cors');

const { PORT, CLOUDINARY_PATH } = process.env;

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
app.use(bodyParser.text());
app.use(cors());

// ROUTES
if (CLOUDINARY_PATH === 'production') {
  const staticPath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'client',
    'build'
  );
  const indexHtmlPath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'client',
    'build',
    'index.html'
  );
  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    res.sendFile(indexHtmlPath);
  });
}
app.use('/api', require('../routes/api'));
app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});

module.exports = app;
