const express = require("express");
const projectController = require("../controllers/projectController");
const ticketController = require("../controllers/ticketController");
const commentController = require("../controllers/commentController");
const router = express.Router();

//Project
router.get("/", projectController.getAllProjects);
router.get("/:project_id", projectController.getByIdProject);
router.post("/", projectController.createProject);
router.put("/:project_id", projectController.updateProject);
router.delete("/:project_id", projectController.deleteProject);

//Ticket
router.get("/:project_id/ticket/:ticket_id", ticketController.getByIdTicket);
router.post("/:project_id/ticket", ticketController.createTicket);
router.put("/:project_id/ticket/:ticket_id", ticketController.updateTicket);

//Comment
router.post(
  "/:project_id/ticket/:ticket_id/comment",
  commentController.createComment
);

module.exports = router;
