const express = require("express");
const multer = require("multer");
const projectController = require("../controllers/projectController");
const commentController = require("../controllers/commentController");
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

//Comment
router.get(
  "/:project_id/ticket/:ticket_id/comment/:comment_id",
  commentController.getByIdComment
);
router.post(
  "/:project_id/ticket/:ticket_id/comment",
  commentController.createComment
);
router.put(
  "/:project_id/ticket/:ticket_id/comment/:comment_id",
  commentController.updateComment
);
router.delete(
  "/:project_id/ticket/:ticket_id/comment/:comment_id",
  commentController.deleteComment
);

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
