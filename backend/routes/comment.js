const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

//Comment
router.get("/:comment_id", commentController.getByIdComment);
router.post("/:ticket_id", commentController.createComment);
router.put("/:comment_id", commentController.updateComment);
router.delete("/:comment_id", commentController.deleteComment);
module.exports = router;
