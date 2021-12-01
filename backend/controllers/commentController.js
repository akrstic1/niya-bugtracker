const Project = require("../models/Project");
const {
  createCommentValidation,
  updateCommentValidation,
} = require("../helpers/validation");
const ObjectId = require("mongoose").Types.ObjectId;

const getByIdComment = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.project_id) ||
    !ObjectId.isValid(req.params.ticket_id) ||
    !ObjectId.isValid(req.params.comment_id)
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

    const commentById = ticketById.comments.id(req.params.comment_id);
    if (commentById == null) {
      return res.status(404).json({ message: "Comment not found." });
    }

    return res.json(commentById);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createComment = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.project_id) ||
    !ObjectId.isValid(req.params.ticket_id)
  ) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const validation = createCommentValidation(req.body);
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

const updateComment = async (req, res) => {
  const validation = updateCommentValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  if (
    !ObjectId.isValid(req.params.project_id) ||
    !ObjectId.isValid(req.params.ticket_id) ||
    !ObjectId.isValid(req.params.comment_id)
  ) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const projectToUpdate = await Project.findById(req.params.project_id);

  const ticketToUpdate = projectToUpdate.tickets.id(req.params.ticket_id);
  if (ticketToUpdate == null) {
    return res.status(404).json({ message: "Ticket not found!" });
  }

  const commentToUpdate = ticketToUpdate.comments.id(req.params.comment_id);
  if (commentToUpdate == null) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  commentToUpdate.set(req.body);

  try {
    const savedProject = await projectToUpdate.save();
    return res.json(savedProject);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteComment = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.project_id) ||
    !ObjectId.isValid(req.params.ticket_id) ||
    !ObjectId.isValid(req.params.comment_id)
  ) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const projectToDelete = await Project.findById(req.params.project_id);

  const ticketToDelete = projectToDelete.tickets.id(req.params.ticket_id);
  if (ticketToDelete == null) {
    return res.status(404).json({ message: "Ticket not found!" });
  }

  const commentToDelete = ticketToDelete.comments.id(req.params.comment_id);
  if (commentToDelete == null) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  try {
    commentToDelete.remove();
    projectToDelete.save();
    return res.json({ message: "Deleted sucessfully!" });
  } catch (error) {
    return res.status(500).send("Ticket not deleted!");
  }
};

module.exports = {
  getByIdComment,
  createComment,
  updateComment,
  deleteComment,
};
