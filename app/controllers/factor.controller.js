const db = require("../models");
const Factor = db.factor;

// Retrieve existing factor
exports.getAllInterLayerFactors = async (req,res) => {
    await Factor.find(
        ).exec((err, factors) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!factors) {
            return res.status(404).send({ message: "Factor Not found." });
        }
    
        res.status(200).send({factors});
        }
    );

}
// Add new Factor
exports.addFactor = (req,res) => {
    const factor = new Factor({
        factorName:        req.body.factorName,
        layer:             req.body.layer,
        class:             req.body.class,
        humanFactor:       req.body.humanFactor,
        type:              req.body.type,
        frequencyInDomain: new Map()

      });
    factor.save((err, factor) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        res.send({ 
            message: "Factor has been added successfully!",
        });
         
        });

}

exports.addDomainFreq = async (req,res) => {
    const factor = await Factor.findOne({facetName: req.body.factorName});
    let value = factor.frequencyInDomain.get(req.body.domainName);

    // Find frequency value or set as one if not added in yet
    if (value === undefined) {
        factor.frequencyInDomain.set(req.body.domainName, 1);
    } else {
        factor.frequencyInDomain.set(req.body.domainName, value + 1);
    }

    factor.save((err, factor) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    
        res.send({message: "Domain frequency updated successfully!"});
        }
    );

}
