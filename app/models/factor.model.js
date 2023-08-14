const mongoose = require("mongoose");

const Factor = mongoose.model(
  "factors",
  new mongoose.Schema({
    factorName:        String,
    layer:             String,
    class:             String,
    humanFactor:       String,
    type:              String,
    frequencyInDomain: mongoose.Schema.Types.Mixed
  },{versionKey: false})         // set versionKey to false, when insert an new document without "__v" field
                                 // if need version control can remove it.
);

module.exports = Factor;