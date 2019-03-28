const express = require('express');
const router = express.Router();
const multiPartMiddleware = require('connect-multiparty')();
const agentController = require('../controllers/agents');
const sanitizeBody = require('../middleware/sanitization/sanitizeBody');
const authorize = require("../middleware/auth/verifyToken");

router.use(sanitizeBody);

// POST routes
router.post('/', multiPartMiddleware, agentController.insertAgent);

// GET routes
router.get('/', authorize, agentController.getAllAgents);
router.get('/:agentID', authorize, agentController.getAgentByID);

// PATCH routes
router.patch('/:agentID', authorize, multiPartMiddleware, agentController.patchAgentByID);

// DELETE routes
router.delete('/:agentID', authorize, agentController.deleteAgentByID);

module.exports = router;