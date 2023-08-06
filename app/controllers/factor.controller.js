const db = require("../models");
const Factor = db.factor;


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

exports.addFactor = (req,res) => {
    const factor = new Factor({
        factorName:        req.body.factorName,
        layer:             req.body.layer,
        class:             req.body.class,
        humanFactor:       req.body.humanFactor,
        type:              req.body.type,
        frequencyInDomain: []

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
