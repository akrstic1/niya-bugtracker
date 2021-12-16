const Project = require("../models/Project");
const ObjectId = require("mongoose").Types.ObjectId;

const assignToUser = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.ticket_id) ||
    !ObjectId.isValid(req.params.user_id)
  ) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const project = await Project.findOne({
    "tickets._id": req.params.ticket_id,
  });
  if (!project) {
    return res.status(404).json({ message: "Ticket not found!" });
  }

  const ticketToAssign = project.tickets.id(req.params.ticket_id);
  if (!ticketToAssign) {
    return res.status(404).json({ message: "Ticket not found!" });
  }

  if (
    !(
      req.user.roles.includes("Admin") ||
      req.user.roles.includes("Project manager")
    ) &&
    req.user._id != ticketToAssign.submitter_id
  ) {
    return res.status(404).json({ message: "Access denied!" });
  }

  //If assign exists, check if the same user is already assigned
  if (ticketToAssign.assigns[0]) {
    if (
      ticketToAssign.assigns.sort(function (a, b) {
        return new Date(b.assignedDate) - new Date(a.assignedDate);
      })[0].assignedToUser_id == req.params.user_id
    ) {
      return res.status(400).json({ message: "User already assigned!" });
    }
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
