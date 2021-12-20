const fs = require("fs");
const path = require("path");
const Project = require("../models/Project");
const ObjectId = require("mongoose").Types.ObjectId;

const getAttachment = async (req, res) => {
  if (!ObjectId.isValid(req.params.attachment_id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const project = await Project.findOne({
    "tickets.attachments._id": req.params.attachment_id,
  });
  if (!project) {
    return res.status(404).json({ message: "Attachment not found!" });
  }

  let attachment;
  for (let i = 0; i < project.tickets.length; i++) {
    if (project.tickets[i].attachments.id(req.params.attachment_id)) {
      attachment = project.tickets[i].attachments.id(req.params.attachment_id);
    }
  }

  if (attachment == null) {
    console.log(project);
    return res.status(404).json({ message: "Attachment not found!" });
  }

  try {
    return res.sendFile(
      path.join(__dirname, "../tmp/images", attachment.fileName)
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send("Attachment not deleted!");
  }
};

const saveAttachment = async (req, res) => {
  if (!ObjectId.isValid(req.params.ticket_id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const project = await Project.findOne({
    "tickets._id": req.params.ticket_id,
  });
  if (!project) {
    return res.status(404).json({ message: "Ticket not found!" });
  }

  if (
    !(
      project.users.includes(req.user._id) ||
      req.user.roles.some((x) => {
        return x == "Admin";
      })
    )
  ) {
    return res.status(401).json({ message: "Access denied!" });
  }

  const ticketToUpload = project.tickets.id(req.params.ticket_id);
  if (!ticketToUpload) {
    return res.status(404).json({ message: "Ticket not found!" });
  }
  console.log(req.files);
  for (const file of req.files) {
    const newAttachment = {
      fileName: file.filename,
      uploader_id: req.user._id,
    };
    ticketToUpload.attachments.push(newAttachment);
  }
  try {
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteAttachment = async (req, res) => {
  if (!ObjectId.isValid(req.params.attachment_id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const project = await Project.findOne({
    "tickets.attachments._id": req.params.attachment_id,
  });
  if (!project) {
    return res.status(404).json({ message: "Attachment not found!" });
  }

  let attachmentToDelete;
  for (let i = 0; i < project.tickets.length; i++) {
    if (project.tickets[i].attachments.id(req.params.attachment_id)) {
      attachmentToDelete = project.tickets[i].attachments.id(
        req.params.attachment_id
      );
    }
  }
  if (attachmentToDelete == null) {
    return res.status(404).json({ message: "Attachment not found!" });
  }

  if (
    attachmentToDelete.uploader_id != req.user._id &&
    !(
      req.user.roles.includes("Admin") ||
      req.user.roles.includes("Project manager")
    )
  ) {
    return res.status(404).json({ message: "Access denied!" });
  }

  try {
    await fs.unlink("./tmp/images/" + attachmentToDelete.fileName, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Attachment not deleted!");
      }
    });
    attachmentToDelete.remove();

    project.save();
    return res.json({ message: "Deleted sucessfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Attachment not deleted!");
  }
};

module.exports = {
  getAttachment,
  saveAttachment,
  deleteAttachment,
};
