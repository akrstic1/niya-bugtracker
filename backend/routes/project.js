const express = require("express");
const projectController = require("../controllers/projectController");

const router = express.Router();

router.get("/", projectController.getAllProjects);

router.post("/", projectController.createProject);

router.post("/:project_id/ticket", projectController.createTicket);

router.post(
  "/:project_id/ticket/:ticket_id/comment",
  projectController.createComment
);

module.exports = router;
