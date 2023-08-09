const mongoose = require("mongoose");

const Persona = mongoose.model(
  "personas",
  new mongoose.Schema({
    domainName: String,
    otherLayer: mongoose.Schema.Types.Array,
    internalLayer: mongoose.Schema.Types.Array,
    externalLayer: mongoose.Schema.Types.Array
    
  },{versionKey: false})         // set versionKey to false, when insert an new document without "__v" field
                                 // if need version control can remove it.
);

module.exports = Persona;