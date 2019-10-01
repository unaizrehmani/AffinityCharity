const express = require('express');
const router = express.Router();
const multiPartMiddleware = require('connect-multiparty')();
const causeController = require('../controllers/causes');
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');
const authorize = require('../middleware/auth/verifyToken');

router.use(authorize);
router.use(sanitizeBody);

/*
 * POST /api/causes/
 */
router.post('/', multiPartMiddleware, causeController.insertCause);

/*
 * GET /api/causes/
 */
router.get('/', causeController.getAllCauses);
router.get('/:causeID', causeController.getCauseByID);

/*
 * PATCH /api/causes/
 */
router.patch('/:causeID', multiPartMiddleware, causeController.patchCauseByID);

/*
 * DELETE /api/causes/
 */
router.delete('/:causeID', causeController.deleteCauseByID);

module.exports = router;
