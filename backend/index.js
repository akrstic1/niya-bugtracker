const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./helpers/errorHandler");
require("dotenv").config();

//Import routes
const apiRouter = require("./routes/api");

// DB connect
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("DB connection success!");
});

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//Route middlewares
app.use("/api", apiRouter);

//Static backend
app.get("/", (req, res) => {
  res.send("Hello world!");
});

//Global error handler
app.use(errorHandler);

app.listen(3000);
