const express = require("express");

const projectController = require("../controllers/projectController");

const router = express.Router();

//Project
router.get("/", projectController.getAllProjects);
router.get("/:project_id", projectController.getByIdProject);
router.post("/", projectController.createProject);
router.put("/:project_id", projectController.updateProject);
router.delete("/:project_id", projectController.deleteProject);

module.exports = router;
