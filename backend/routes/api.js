const express = require("express");
const authorize = require("../middlewares/authorization");

// routes
const authRouter = require("./auth");
const userRouter = require("./user");
const roleRouter = require("./role");
const projectRouter = require("./project");
const ticketRouter = require("./ticket");
const commentRouter = require("./comment");
const attachmentRouter = require("./attachment");
const assignRouter = require("./assign");

const app = express();

app.get("/", authorize(["Admin"]), (req, res) => {
  res.send("Hello from api!");
});

// routing
app.use("/auth", authRouter);
app.use("/user", authorize(), userRouter);
app.use("/role", roleRouter);
app.use("/project", authorize(), projectRouter);
app.use("/ticket", authorize(), ticketRouter);
app.use("/comment", authorize(), commentRouter);
app.use("/attachment", authorize(), attachmentRouter);
app.use("/assign", authorize(), assignRouter);

module.exports = app;
