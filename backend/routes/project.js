const express = require("express");
const Project = require("../models/Project");

const {
  projectValidation,
  ticketValidation,
  commentValidation,
} = require("../helpers/validation");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allProjects = await Project.find().populate({
      path: "users",
      select: "-hashPassword",
      populate: { path: "roles" },
    });
    res.json(allProjects);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  const validation = projectValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  const newProject = new Project({
    name: req.body.name,
    description: req.body.description,
    users: req.body.users,
  });

  try {
    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/:project_id/ticket", async (req, res) => {
  const validation = ticketValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  const projectToUpdate = await Project.findById(
    req.params.project_id
  ).populate({
    path: "users",
    select: "-hashPassword",
    populate: { path: "roles" },
  });

  console.log(projectToUpdate);

  if (!projectToUpdate) {
    return res.status(404).json({ message: "Project not found!" });
  }

  const newTicket = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    submitter_id: req.user._id,
  };

  projectToUpdate.tickets.push(newTicket);

  try {
    const savedProject = await projectToUpdate.save();
    res.json(savedProject);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/:project_id/ticket/:ticket_id/comment", async (req, res) => {
  const validation = commentValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  const projectToUpdate = await Project.findById(req.params.project_id);
  if (!projectToUpdate) {
    return res.status(404).json({ message: "Project not found!" });
  }

  if (!projectToUpdate.tickets.id(req.params.ticket_id)) {
    return res.status(404).json({ message: "Ticket not found!" });
  }

  const newComment = {
    message: req.body.message,
    commenter_id: req.user._id,
  };

  projectToUpdate.tickets.id(req.params.ticket_id).comments.push(newComment);

  try {
    const savedTicket = await projectToUpdate.save();
    res.json(savedTicket);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
