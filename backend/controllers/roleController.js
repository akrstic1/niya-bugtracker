const Role = require("../models/Role");

const getAllRoles = async (req, res) => {
  try {
    const allRoles = await Role.find();
    res.json(allRoles);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createRole = async (req, res) => {
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
};

module.exports = {
  getAllRoles,
  createRole,
};
