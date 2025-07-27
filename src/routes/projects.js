const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

const { auth, authorize } = require("../middleware/auth");
const { validateProject } = require("../middleware/validators");

router.post(
  "/",
  auth,
  authorize("admin"),
  validateProject,
  projectController.createProject
);
router.get("/", auth, projectController.getProjects);
router.get("/:id", auth, projectController.getProject);
router.put("/:id", auth, authorize("admin"), projectController.updateProject);
router.delete(
  "/:id",
  auth,
  authorize("admin"),
  projectController.deleteProject
);

module.exports = router;
