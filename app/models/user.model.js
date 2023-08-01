const mongoose = require("mongoose");

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    username: String,
    // email: String,
    password: String,
    personas: []
    // roles: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Role"
    //   }
    // ]
  })
);

module.exports = User;