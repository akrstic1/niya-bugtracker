const express = require("express");
const authorize = require("../middlewares/authorization");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

router.put("/:id/changepassword", authorize(), userController.changePassword);
router.put("/:id/", authorize(), userController.updateUser);

module.exports = router;
