const mongoose = require("mongoose");

const Persona = mongoose.model(
  "personas",
  new mongoose.Schema({
    type: String,
    domainName: mongoose.Schema.Types.Array,
    internalLayer: mongoose.Schema.Types.Mixed,
    externalLayer: mongoose.Schema.Types.Mixed
    
  },{versionKey: false})         // set versionKey to false, when insert an new document without "__v" field
                                 // if need version control can remove it.
);

module.exports = Persona;