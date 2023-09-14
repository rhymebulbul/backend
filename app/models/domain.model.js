const mongoose = require("mongoose");

const Domain = mongoose.model(
  "domains",
  new mongoose.Schema({
    domainName: String,
    possibleFactors: mongoose.Schema.Types.Array
    
  },{versionKey: false})         // set versionKey to false, when insert an new document without "__v" field
                                 // if need version control can remove it.
);

module.exports = Domain;