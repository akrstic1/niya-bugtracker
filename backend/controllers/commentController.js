const Project = require("../models/Project");
const { commentValidation } = require("../helpers/validation");
const ObjectId = require("mongoose").Types.ObjectId;

const createComment = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.project_id) ||
    !ObjectId.isValid(req.params.ticket_id)
  ) {
    return res.status(400).json({ message: "Bad object ID" });
  }

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
  createComment,
};
