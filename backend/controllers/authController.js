const User = require("../models/User");
const Role = require("../models/Role");
const {
  registerValidation,
  loginValidation,
} = require("../helpers/validation");

const register = async (req, res) => {
  const validation = registerValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  if (await User.exists({ username: req.body.username })) {
    return res.status(400).json({ message: "Username already in use!" });
  }

  for (const element of req.body.roles) {
    if (!(await Role.exists({ _id: element }))) {
      return res.status(400).json({ message: "Role doesn't exist!" });
    }
  }

  const newUser = new User({
    fullName: req.body.fullName,
    username: req.body.username,
    hashPassword: await User.setPassword(req.body.password),
    roles: req.body.roles,
  });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const validation = loginValidation(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }

  const user = await User.findOne({ username: req.body.username }).populate(
    "roles"
  );

  if (!user) {
    return res.status(400).json({ message: "Username or password is wrong!" });
  }
  if (!(await user.validPassword(req.body.password))) {
    return res.status(400).json({ message: "Username or password is wrong!" });
  }

  const token = user.generateJwt();

  return res.json(token);
};

module.exports = { register, login };
