const express = require('express');
const router = express.Router();
const multiPartMiddleware = require('connect-multiparty')();
const donorController = require('../controllers/donors');
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');
const authorize = require('../middleware/auth/verifyToken');

router.use(sanitizeBody);
router.use(multiPartMiddleware);

/*
 * POST /api/donors/
 */
router.post('/', donorController.insertDonor);

/*
 * GET /api/donors/
 */
router.get('/', authorize, donorController.getAllDonors);
/*
 * GET /api/donors/:donorID
 */
router.get('/:donorID', authorize, donorController.getDonorByID);

/*
 * PATCH /api/donors/:donorID
 */
router.patch('/:donorID', authorize, donorController.patchDonorByID);

/*
 * DELETE /api/donors/:donorID
 */
router.delete('/:donorID', authorize, donorController.deleteDonorByID);

module.exports = router;
