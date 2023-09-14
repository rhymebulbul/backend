const db = require("../models");
const Persona = db.persona;

// Retrieve saved persona
exports.getPersonaByDomain = async (req,res) => {
    await Persona.find(
        ).exec((err, personas) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    
        if (!personas) {
            return res.status(404).send({ message: "Persona Not found." });
        }
    
        res.status(200).send({personas});
        }
    );

}
// Save generated Persona
exports.addPersona = (req,res) => {
    const persona = new Persona({
        domainName: req.body.domainName,
        type: req.body.type,
        internalLayer: req.body.internalLayer,
        externalLayer: req.body.externalLayer

      });
    persona.save((err, persona) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        res.send({ 
            message: "Persona has been added successfully!",
        });
         
        });

}
