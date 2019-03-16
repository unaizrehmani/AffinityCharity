const express = require("express");
const router = express.Router();
const multiPartMiddleware = require("connect-multiparty")();
const agentController = require("../controllers/agents");
const sanitizeBody = require("../middleware/sanitization/sanitizeBody");

router.use(sanitizeBody);

//POST routes
router.post("/", multiPartMiddleware, agentController.insertAgent);

//GET routes
router.get("/", agentController.getAllAgents);
router.get("/:agentID", agentController.getAgentByID);

//PATCH routes
router.patch("/:agentID", agentController.patchAgentByID);

//DELETE routes
router.delete("/:agentID", agentController.deleteAgentByID);

module.exports = router;
