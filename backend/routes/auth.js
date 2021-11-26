const express = require("express");
const User = require("../models/User");
const Role = require("../models/Role");
const {
  registerValidation,
  loginValidation,
} = require("../helpers/validation");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from auth route!");
});

router.post("/register", async (req, res) => {
  const validation = registerValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  if (await User.exists({ email: req.body.email })) {
    return res.status(400).json({ message: "Email already in use!" });
  }

  for (const element of req.body.roles) {
    if (!(await Role.exists({ _id: element }))) {
      return res.status(400).json({ message: "Role doesn't exist!" });
    }
  }

  const newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    hashPassword: await User.setPassword(req.body.password),
    roles: req.body.roles,
  });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const validation = loginValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: "Email or password is wrong!" });
  }

  if (!(await user.validPassword(req.body.password))) {
    return res.status(400).json({ message: "Email or password is wrong!" });
  }

  return res.json({ message: "Login succeeded!" });
});

module.exports = router;
