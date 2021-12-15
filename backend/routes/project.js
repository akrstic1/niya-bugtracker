const express = require("express");

const projectController = require("../controllers/projectController");
const assignController = require("../controllers/assignController");

const router = express.Router();

//Project
router.get("/", projectController.getAllProjects);
router.get("/:project_id", projectController.getByIdProject);
router.post("/", projectController.createProject);
router.put("/:project_id", projectController.updateProject);
router.delete("/:project_id", projectController.deleteProject);

//Assign
router.post(
  "/:project_id/ticket/:ticket_id/assign/:user_id",
  assignController.assignToUser
);

module.exports = router;
