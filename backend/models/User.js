/* eslint-disable no-useless-escape */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 20,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

userSchema.statics.setPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.hashPassword);
};

userSchema.methods.generateJwt = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullName: this.fullName,
      roles: this.roles.map((p) => p.name),
    },
    process.env.JWT_SECRET
  );
};

module.exports = mongoose.model("User", userSchema);
