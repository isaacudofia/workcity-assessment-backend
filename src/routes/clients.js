const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

const { auth, authorize } = require("../middleware/auth");
const { validateClient } = require("../middleware/validators");

router.post(
  "/",
  auth,
  authorize("admin"),
  validateClient,
  clientController.createClient
);
router.get("/", auth, clientController.getClients);
router.get("/:id", auth, clientController.getClient);
router.put("/:id", auth, authorize("admin"), clientController.updateClient);
router.delete("/:id", auth, authorize("admin"), clientController.deleteClient);
router.get("/:id/projects", auth, clientController.getProjectsByClient);

module.exports = router;
