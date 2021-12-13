const Project = require("../models/Project");
const {
  createCommentValidation,
  updateCommentValidation,
} = require("../helpers/validation");
const ObjectId = require("mongoose").Types.ObjectId;

const getByIdComment = async (req, res) => {
  if (!ObjectId.isValid(req.params.comment_id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  try {
    const project = await Project.findOne(
      { "tickets.comments._id": req.params.comment_id },
      {
        tickets: 1,
      }
    ).populate([
      {
        path: "tickets.submitter_id",
        select: "-hashPassword",
      },
      {
        path: "tickets.comments.commenter_id",
        select: "-hashPassword",
      },
    ]);
    if (project == null) {
      return res.status(404).json({ message: "Comment not found." });
    }

    const commentById = project.tickets[0].comments.id(req.params.comment_id);
    if (commentById == null) {
      return res.status(404).json({ message: "Comment not found." });
    }

    return res.json(commentById);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createComment = async (req, res) => {
  if (!ObjectId.isValid(req.params.ticket_id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const validation = createCommentValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  const project = await Project.findOne({
    "tickets._id": req.params.ticket_id,
  });
  if (!project) {
    return res.status(404).json({ message: "Ticket not found!" });
  }

  if (!project.tickets.id(req.params.ticket_id)) {
    return res.status(404).json({ message: "Ticket not found!" });
  }

  const newComment = {
    message: req.body.message,
    commenter_id: req.user._id,
  };

  project.tickets.id(req.params.ticket_id).comments.push(newComment);

  try {
    const savedTicket = await project.save();
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

  if (!ObjectId.isValid(req.params.comment_id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const project = await Project.findOne({
    "tickets.comments._id": req.params.comment_id,
  });
  if (!project) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  const commentToUpdate = project.tickets[0].comments.id(req.params.comment_id);
  if (commentToUpdate == null) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  commentToUpdate.set(req.body);

  try {
    const savedProject = await project.save();
    return res.json(savedProject);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteComment = async (req, res) => {
  if (!ObjectId.isValid(req.params.comment_id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const project = await Project.findOne({
    "tickets.comments._id": req.params.comment_id,
  });
  if (!project) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  const commentToDelete = project.tickets[0].comments.id(req.params.comment_id);
  if (commentToDelete == null) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  try {
    commentToDelete.remove();
    project.save();
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
