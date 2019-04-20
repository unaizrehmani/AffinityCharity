const express = require('express');
const router = express.Router();
const multipartMiddleware = require('connect-multiparty')();
const charityController = require('../controllers/charity');
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');
const authorize = require('../middleware/auth/verifyToken');

router.use(authorize);
router.use(sanitizeBody);

/*
 * POST /api/charity/
 */
router.post('/', multipartMiddleware, charityController.insertCharity);

/*
 * GET /api/charity/
 */
router.get('/:charityID', charityController.getCharityByID);
router.get('/', charityController.getAllCharities);

/*
 * PATCH /api/charity/
 */
router.patch('/:charityID', multipartMiddleware, charityController.patchCharityByID);

/*
 * DELETE /api/charity/
 */
router.delete('/:charityID', charityController.deleteCharityByID);

module.exports = router;
