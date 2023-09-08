const mongoose = require("mongoose");

const Factor = mongoose.model(
  "factors",
  new mongoose.Schema({
    facetName:        String,
    layer:             String,
    class:             String,
    humanFactors:       String,
    type:              String,
    frequencyInDomain: { 
      type: Map,
      of: Number
    }
  },{versionKey: false})         // set versionKey to false, when insert an new document without "__v" field
                                 // if need version control can remove it.
);

module.exports = Factor;