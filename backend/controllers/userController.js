const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}, { hashPassword: 0 }).populate("roles");
    return res.json(allUsers);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, {
      hashPassword: 0,
    }).populate("roles");
    if (user == null) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(404).send(error);
  }
};
module.exports = { getAllUsers, getUserById };
