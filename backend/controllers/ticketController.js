const Project = require("../models/Project");
const {
  createTicketValidation,
  updateTicketValidation,
} = require("../helpers/validation");
const ObjectId = require("mongoose").Types.ObjectId;

const getByIdTicket = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.project_id) ||
    !ObjectId.isValid(req.params.ticket_id)
  ) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  try {
    const allProjectTickets = await Project.findById(req.params.project_id, {
      tickets: 1,
    }).populate([
      {
        path: "tickets.submitter_id",
        select: "-hashPassword",
      },
      {
        path: "tickets.comments.commenter_id",
        select: "-hashPassword",
      },
    ]);
    if (allProjectTickets == null) {
      return res.status(404).json({ message: "Project not found." });
    }

    const ticketById = allProjectTickets.tickets.id(req.params.ticket_id);
    if (ticketById == null) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    return res.json(ticketById);
  } catch (error) {
    return res.status(404).send(error);
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

const updateTicket = async (req, res) => {
  const validation = updateTicketValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  if (
    !ObjectId.isValid(req.params.project_id) ||
    !ObjectId.isValid(req.params.ticket_id)
  ) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const projectToUpdate = await Project.findById(req.params.project_id);

  const ticketToUpdate = projectToUpdate.tickets.id(req.params.ticket_id);
  if (ticketToUpdate == null) {
    return res.status(404).json({ message: "Ticket not found!" });
  }

  ticketToUpdate.set(req.body);

  const savedProject = await projectToUpdate.save();
  return res.json(savedProject);
};

const deleteTicket = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.project_id) ||
    !ObjectId.isValid(req.params.ticket_id)
  ) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const projectToDelete = await Project.findById(req.params.project_id);

  const ticketToDelete = projectToDelete.tickets.id(req.params.ticket_id);
  if (ticketToDelete == null) {
    return res.status(404).json({ message: "Ticket not found!" });
  }

  try {
    ticketToDelete.remove();
    projectToDelete.save();
    return res.json({ message: "Deleted sucessfully!" });
  } catch (error) {
    return res.status(500).send("Ticket not deleted!");
  }
};

module.exports = {
  getByIdTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
