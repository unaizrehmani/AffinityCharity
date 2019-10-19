const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/causes', require('./causes'));
router.use('/donors', require('./donors'));
router.use('/charity', require('./charity'));
module.exports = router;
