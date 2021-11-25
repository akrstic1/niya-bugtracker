const express = require("express");
const User = require("../models/User");

const router = express.Router();

function UserData(data) {
  this._id = data._id;
  this.fullName = data.fullName;
  this.hashPassword = data.hashPassword;
  this.email = data.email;
  this.roles = data.roles;
}

router.get("/", (req, res) => {
  res.send("Hello from user route!");
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("roles");
    res.json(user);
  } catch (error) {
    res.status(404).send();
  }
});

router.post("/", async (req, res) => {
  const newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    hashPassword: req.body.hashPassword,
    email: req.body.email,
    roles: req.body.roles,
  });
  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
