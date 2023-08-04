const db = require("../models");
const Domain = db.domain;


exports.getAllDomain = async (req,res) => {
    await Domain.find(
        ).exec((err, domains) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    
        if (!domains) {
            return res.status(404).send({ message: "Domain Not found." });
        }
    
        res.status(200).send({domains});
        }
    );

}

exports.addDomain = (req,res) => {
    const domain = new Domain({
        domainName: req.body.domainName,
        possibleFactors: [],
        personas: []

      });
    domain.save((err, domain) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        res.send({ 
            message: "Domain has been added successfully!",
        });
         
        });

}
