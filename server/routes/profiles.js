const express = require('express');
const router = express.Router();
const multiPartMiddleware = require('connect-multiparty')();
const profileController = require('../controllers/profiles');
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');
const authorize = require('../middleware/auth/verifyToken');

router.use(authorize);
router.use(sanitizeBody);

/*
 * POST /api/profiles/
 */
router.post('/', multiPartMiddleware, profileController.insertProfile);

/*
 * GET /api/profiles/
 */
router.get('/', profileController.getAllProfiles);
router.get('/:profileID', profileController.getProfileByID);

/*
 * PATCH /api/profiles/
 */
router.patch(
  '/:profileID',
  multiPartMiddleware,
  profileController.patchProfileByID
);

/*
 * DELETE /api/profiles/
 */
router.delete('/:profileID', profileController.deleteProfileByID);

module.exports = router;
