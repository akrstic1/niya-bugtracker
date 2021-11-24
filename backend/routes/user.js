const express = require("express");
const User = require("../models/User");

const router = express.Router();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from user route!");
});

module.exports = app;
