const express = require("express");
const authorize = require("../middlewares/authorization");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/:user_id/info", userController.getUserInfo);

router.put("/:id/changepassword", authorize(), userController.changePassword);
router.put("/:id/", userController.updateUser);

module.exports = router;
