const express = require("express");
const attachmentController = require("../controllers/attachmentController");
const multer = require("multer");

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

//Attachment
router.get("/:attachment_id", attachmentController.getAttachment);
router.post(
  "/:ticket_id",
  upload.array("images", 12),
  attachmentController.saveAttachment
);
router.delete("/:attachment_id", attachmentController.deleteAttachment);

module.exports = router;
