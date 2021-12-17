const User = require("../models/User");
const Project = require("../models/Project");
const {
  changePasswordValidation,
  updateUserValidation,
} = require("../helpers/validation");
const ObjectId = require("mongoose").Types.ObjectId;

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}, { hashPassword: 0 }).populate("roles");
    return res.json(allUsers);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const getUserById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }
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

const changePassword = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }
  const validation = changePasswordValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (user._id != req.user._id) {
      return res.status(403).json({ message: "Access Denied!" });
    }

    user.hashPassword = await User.setPassword(req.body.password);
    user.save();
    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }

  const validation = updateUserValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  /*
  Checks if username property is already in use,
  but eliminates the special case where that username belongs to the user being updated
  */
  if (req.body.username) {
    const sameUsername = await User.findOne({ username: req.body.username });
    if (sameUsername) {
      if (sameUsername._id != req.params.id) {
        return res.status(400).json({ message: "Username already in use!" });
      }
    }
  }

  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (user._id != req.user._id && !req.user.roles.includes("Admin")) {
      return res.status(403).json({ message: "Access Denied!" });
    }

    await user.updateOne(req.body);
    user.save();
    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getUserInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.user_id)) {
    return res.status(400).json({ message: "Bad object ID" });
  }
  const projectByUser = await Project.find({
    $or: [
      { users: req.params.user_id },
      { "tickets.submitter_id": req.params.user_id },
      { "tickets.assigns.assignedToUser_id": req.params.user_id },
    ],
  }).populate([
    {
      path: "users",
      select: "-hashPassword",
      populate: { path: "roles" },
    },
    {
      path: "tickets.assigns.assignedToUser_id",
      select: "-hashPassword",
      populate: { path: "roles" },
    },
    {
      path: "tickets.submitter_id",
      select: "-hashPassword",
      populate: { path: "roles" },
    },
    {
      path: "tickets.attachments.uploader_id",
      select: "-hashPassword",
      populate: { path: "roles" },
    },
  ]);
  res.json(projectByUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  changePassword,
  updateUser,
  getUserInfo,
};
