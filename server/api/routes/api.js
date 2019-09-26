const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/profiles', require('./profiles'));
router.use('/agents', require('./agents'));
router.use('/charity', require('./charity'));
router.use('/email', require('./email'));
module.exports = router;
