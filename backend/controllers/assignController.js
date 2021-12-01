const Project = require("../models/Project");
const ObjectId = require("mongoose").Types.ObjectId;

const assignToUser = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.project_id) ||
    !ObjectId.isValid(req.params.ticket_id) ||
    !ObjectId.isValid(req.params.user_id)
  ) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  if (
    req.params.user_id != req.user._id &&
    !(
      req.user.roles.includes("Admin") ||
      req.user.roles.includes("Project manager")
    )
  ) {
    return res.status(404).json({ message: "Access denied!" });
  }

  const project = await Project.findById(req.params.project_id);
  if (!project) {
    return res.status(404).json({ message: "Project not found!" });
  }

  const ticketToAssign = project.tickets.id(req.params.ticket_id);
  if (!ticketToAssign) {
    return res.status(404).json({ message: "Ticket not found!" });
  }

  const newAssign = {
    assignedToUser_id: req.params.user_id,
    assignedByUser_id: req.user._id,
  };

  ticketToAssign.assigns.push(newAssign);

  try {
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  assignToUser,
};
