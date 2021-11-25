const express = require("express");

// routes
const authRouter = require("./auth");
const userRouter = require("./user");
const roleRouter = require("./role");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from api!");
});

// routing
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/role", roleRouter);

module.exports = app;
