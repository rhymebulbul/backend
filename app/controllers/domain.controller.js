const db = require("../models");
const Domain = db.domain;
const Factor = db.factor;

// Retrieve existing domains
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

// Update possible factors based on frequency
exports.updatePossibleFactors = async (req,res) => {
    const domain = await Domain.findOne({domainName: req.body.domainName});
    const allFactors = await Factor.find();

    // Get all frequencies from factors in database
    let freqLst = allFactors.map(factor => { return {
        name: factor.facetName,
        freq: factor.frequencyInDomain.get(req.body.domainName)
    }});

    // Sort based on frequency
    let sortedLst = freqLst.sort((a, b) => b.freq - a.freq);

    // Limit to a possible number of up to 20 factors
    sortedLst = sortedLst.slice(0, 20).filter(f => f.freq !== undefined)

    if (domain != null) {
        domain.possibleFactors = sortedLst.map(f => f.name)
        domain.save((err, domain) => {
            if (err) {
            res.status(500).send({ message: err });
            return;
            }
        
            res.send({ 
                message: "Domain's possible factors updated successfully!",
            });
            
        });
    }
}

// Add new domains
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

exports.addFactorToDomain = async (req,res) => {
    await Domain.updateOne({domainName: req.body.domainName},
       {$addToSet: {possibleFactors: req.body.factorName}} ).exec((err, domain) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    
        if (!domain) {
            return res.status(404).send({ message: "Domain Not found." });
        }
    
        res.send({message: "Possible factor added successfully!"});
        }
    );

}
