const express = require("express");
const authorize = require("../middlewares/authorization");

// routes
const authRouter = require("./auth");
const userRouter = require("./user");
const roleRouter = require("./role");
const projectRouter = require("./project");

const app = express();

app.get("/", authorize(["Admin"]), (req, res) => {
  res.send("Hello from api!");
});

// routing
app.use("/auth", authRouter);
app.use("/user", authorize(), userRouter);
app.use("/role", roleRouter);
app.use("/project", authorize(), projectRouter);

module.exports = app;
