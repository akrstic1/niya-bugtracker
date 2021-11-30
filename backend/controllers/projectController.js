const Project = require("../models/Project");
const {
  createProjectValidation,
  updateProjectValidation,
  createTicketValidation,
  commentValidation,
} = require("../helpers/validation");
const ObjectId = require("mongoose").Types.ObjectId;

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find().populate({
      path: "users",
      select: "-hashPassword",
      populate: { path: "roles" },
    });
    res.json(allProjects);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getByIdProject = async (req, res) => {
  if (!ObjectId.isValid(req.params.project_id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  try {
    const projectById = await Project.findById(req.params.project_id).populate({
      path: "users",
      select: "-hashPassword",
      populate: { path: "roles" },
    });

    if (projectById == null) {
      return res.status(404).json({ message: "Project not found." });
    }

    return res.json(projectById);
  } catch (error) {
    return res.status(404).send(error);
  }
};
const createProject = async (req, res) => {
  const validation = createProjectValidation(req.body);
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
};

const updateProject = async (req, res) => {
  const validation = updateProjectValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.project_id,
    req.body,
    { new: true }
  );
  if (!updatedProject) {
    return res.status(404).json({ message: "Project not found!" });
  }
  return res.json(updatedProject);
};

const deleteProject = async (req, res) => {
  if (!ObjectId.isValid(req.params.project_id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  try {
    const deletedProject = await Project.findByIdAndDelete(
      req.params.project_id
    );
    if (deletedProject == null) {
      return res.status(404).json({ messsage: "Project not found." });
    }
    return res.status(204).json(null);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const createTicket = async (req, res) => {
  const validation = createTicketValidation(req.body);
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
};

const createComment = async (req, res) => {
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
};

module.exports = {
  getAllProjects,
  getByIdProject,
  createProject,
  updateProject,
  deleteProject,
  createTicket,
  createComment,
};
