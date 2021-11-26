const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find().populate("roles");
    res.json(allUsers);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("roles");
    res.json(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
