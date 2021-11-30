const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from auth route!");
});

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

module.exports = router;
