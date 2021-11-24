const express = require("express");

// routes
const authRouter = require("./auth");
const userRouter = require("./user");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from api!");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

module.exports = app;
