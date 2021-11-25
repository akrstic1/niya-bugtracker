const express = require("express");
const Role = require("../models/Role");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from role route!");
});

router.post("/", async (req, res) => {
  const newRole = new Role({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const savedRole = await newRole.save();
    res.send(savedRole);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
