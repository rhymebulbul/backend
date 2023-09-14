const mongoose = require("mongoose");

const User = mongoose.model(
  "users",
  new mongoose.Schema({
    username: String,
    password: String,
    personas: mongoose.Schema.Types.Array,  //only store the personas id
    userDomains: mongoose.Schema.Types.Array,  // only stroe the domain id
    userInternalFactors: mongoose.Schema.Types.Array, //only store the internal factors id
    userExternalFactors: mongoose.Schema.Types.Array // only store the external factors id
    
  },{versionKey: false})         // set versionKey to false, when insert an new document without "__v" field
                                 // if need version control can remove it.
);

module.exports = User;