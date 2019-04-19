const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/profiles', require('./profiles'));
router.use('/agents', require('./agents'));

module.exports = router;
