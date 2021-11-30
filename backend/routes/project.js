const express = require("express");
const projectController = require("../controllers/projectController");

const router = express.Router();

//Project
router.get("/", projectController.getAllProjects);
router.get("/:project_id", projectController.getByIdProject);
router.post("/", projectController.createProject);
router.put("/:project_id", projectController.updateProject);
router.delete("/:project_id", projectController.deleteProject);

//Ticket
router.post("/:project_id/ticket", projectController.createTicket);

//Comment
router.post(
  "/:project_id/ticket/:ticket_id/comment",
  projectController.createComment
);

module.exports = router;
