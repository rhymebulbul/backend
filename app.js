const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const personasRouters = require("./routes/persona-routers");
const usersRouters = require("./routes/users-routers");
const HttpError = require("./models/http-error");

const userName = "FIT4002";
const password = "monashFIT4002";

const url = "mongodb+srv://FIT4002:monashFIT4002@fit4002-team04.ep77oco.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// app.use("/api/persona", personasRouters);
app.use("/api/users", usersRouters);

app.use((req, res, next) => {
  throw (error = new HttpError("Could not find this route.", 404));
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://liang2dd:13726362001@cluster0.q1qy3r7.mongodb.net/persona?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
