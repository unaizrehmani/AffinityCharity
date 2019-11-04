const express = require('express');
const router = express.Router();
const multiPartMiddleware = require('connect-multiparty')();
const causeController = require('../controllers/causes');
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');
const authorize = require('../middleware/auth/verifyToken');

router.use(sanitizeBody);
router.use(multiPartMiddleware);
/*
 * POST /api/causes/
 */
router.post('/', authorize, causeController.insertCause);
/*
 * POST /api/causes/send-email
 */
router.post('/send-email', authorize, causeController.sendEmail);

/*
 * GET /api/causes/
 */
router.get('/', causeController.getAllCauses);
/*
 * GET /api/causes/:causeID
 */
router.get('/:causeID', causeController.getCauseByID);

/*
 * PATCH /api/causes/:causeID
 */
router.patch('/:causeID', authorize, causeController.patchCauseByID);

/*
 * DELETE /api/causes/
 */
router.delete('/:causeID', authorize, causeController.deleteCauseByID);

module.exports = router;
