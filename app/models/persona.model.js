const mongoose = require("mongoose");

const Persona = mongoose.model(
  "personas",
  new mongoose.Schema({
    type: String,
    domainName: mongoose.Schema.Types.Array,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    content: String,
    internalFactors: mongoose.Schema.Types.Array,
    externalFactors: mongoose.Schema.Types.Array

  }, { versionKey: false })         // set versionKey to false, when insert an new document without "__v" field
  // if need version control can remove it.
);

module.exports = Persona;