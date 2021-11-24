const express = require("express");
const User = require("../models/User");
const mongoose = require("mongoose");

const router = express.Router();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from auth route!");
});

module.exports = app;
