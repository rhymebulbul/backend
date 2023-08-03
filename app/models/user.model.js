const mongoose = require("mongoose");

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    username: String,
    password: String,
    personas: []
    
  },{versionKey: false})         // set versionKey to false, when insert an new document without "__v" field
                                 // if need version control can remove it.
);

module.exports = User;