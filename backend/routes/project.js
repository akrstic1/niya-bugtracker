const express = require("express");
const multer = require("multer");
const projectController = require("../controllers/projectController");
const assignController = require("../controllers/assignController");
const attachmentController = require("../controllers/attachmentController");
const router = express.Router();

//Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp/images");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

//Project
router.get("/", projectController.getAllProjects);
router.get("/:project_id", projectController.getByIdProject);
router.post("/", projectController.createProject);
router.put("/:project_id", projectController.updateProject);
router.delete("/:project_id", projectController.deleteProject);

//Assign
router.post(
  "/:project_id/ticket/:ticket_id/assign/:user_id",
  assignController.assignToUser
);

//Attachment
router.get(
  "/:project_id/ticket/:ticket_id/attachment/:attachment_id",
  attachmentController.getAttachment
);
router.post(
  "/:project_id/ticket/:ticket_id/attachment/:user_id",
  upload.array("images", 12),
  attachmentController.saveAttachment
);
router.delete(
  "/:project_id/ticket/:ticket_id/attachment/:attachment_id",
  attachmentController.deleteAttachment
);

module.exports = router;
