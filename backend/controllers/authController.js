const User = require("../models/User");

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

  // for (const element of req.body.roles) {
  //   if (!(await Role.exists({ _id: element }))) {
  //     return res.status(400).json({ message: "Role doesn't exist!" });
  //   }
  // }

  const newUser = new User({
    fullName: req.body.fullName,
    username: req.body.username,
    hashPassword: await User.setPassword(req.body.password),
    roles: [],
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
    return res.status(401).json({ message: "Username or password is wrong!" });
  }
  if (!(await user.validPassword(req.body.password))) {
    return res.status(401).json({ message: "Username or password is wrong!" });
  }

  const token = user.generateJwt();

  return res.json({
    user: {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      roles: user.roles,
    },
    token: token,
  });
};

const loginWithJwt = async (req, res) => {
  if (!req.body.token) {
    return res.status(400).json({ message: "Please provide a token." });
  }

  var verification = User.verifyJwt(req.body.token);
  if (verification) {
    const user = await User.findById({ _id: verification._id }).populate(
      "roles"
    );

    return res.json({
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        roles: user.roles,
      },
      token: req.body.token,
    });
  } else {
    return res.status(400).json({ message: "Token not valid!" });
  }
};

module.exports = { register, login, loginWithJwt };
