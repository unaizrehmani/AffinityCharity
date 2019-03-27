const express = require('express');
const router = express.Router();
const multiPartMiddleware = require('connect-multiparty')();
const profileController = require('../controllers/profiles');
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');

router.use(sanitizeBody);

// POST routes
router.post('/', multiPartMiddleware, profileController.insertProfile);

// GET routes
router.get('/', profileController.getAllProfiles);
router.get('/:profileID', profileController.getProfileByID);

// PATCH routes
router.patch('/:profileID', profileController.patchProfileByID);

// DELETE routes
router.delete('/:profileID', profileController.deleteProfileByID);

module.exports = router;
