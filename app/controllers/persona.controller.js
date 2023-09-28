const db = require("../models");
const Persona = db.persona;
const User = db.user;
const { Configuration, OpenAIApi } = require("openai");
const { openaiKey } = require("../config/openai.config");
const { ObjectId } = require('mongodb');
// Retrieve saved persona
exports.getPersonaByDomain = async (req, res) => {
    await Persona.find(
    ).exec((err, personas) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!personas) {
            return res.status(404).send({ message: "Persona Not found." });
        }

        res.status(200).send({ personas });
    }
    );

}
exports.addPersona = (req, res) => {

    const persona = new Persona({
        domainName: req.body.domainName,
        type: req.body.type,
        content: req.body.content,
        internalFactors: req.body.internalFactors,
        externalFactors: req.body.externalFactors,
        userId: req.userId,

    });
    console.log(persona);
    persona.save((err, persona) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        // Associate persona with the user
        User.findById(req.userId, (err, user) => {
            if (err || !user) {
                res.status(500).send({ message: 'User not found' });
                return;
            }

            user.personas.push(persona._id);
            user.save();

            res.send({
                message: "Persona has been added successfully!",
                personaId: persona._id
            });
        });
    });

}



exports.updatePersona = (req, res) => {
    const id = req.params.id;

    // Check if there's actually data to update
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can't be empty!"
        });
    }

    Persona.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Persona with id=${id}. Maybe Persona was not found!`
                });
            } else {
                res.send({ message: "Persona was updated successfully." });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Persona with id=" + id
            });
        });
};





const configuration = new Configuration({
    apiKey: openaiKey
});

const openai = new OpenAIApi(configuration);


// generate narrative persona
exports.generateNarrativePersona = async (req, res) => {
    const prompt = `The persona should be related to ${req.body.domains}.The persona should contain the following internal human factors: ${req.body.internalFactors}. And the following external human factors: ${req.body.externalFactors}. And the following extral details :${req.body.extraDetails}.The length of the persona should be ${req.body.length}.`
    console.log(prompt);

    try {
        const response = await openai.createChatCompletion({
            model: "ft:gpt-3.5-turbo-0613:monash-university::7vlMuc50",
            messages: [
                {
                    "role": "system",
                    "content": "You are an assistant that specializes in creating detailed personas following a narrative approach."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        });

        const generatedPersona = response.data.choices[0]?.message?.content.trim();


        if (generatedPersona) {
            res.json({ persona: generatedPersona });
            console.log(res);
        } else {
            res.status(400).json({ error: 'No persona generated' });
        }

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate persona', details: error.response?.data || error.message });
    }


};




exports.generateStructuredPersona = async (req, res) => {
    const prompt = `The persona should be related to ${req.body.domains}.The persona should contain the following internal human factors: ${req.body.internalFactors}. And the following external human factors: ${req.body.externalFactors}.And the following extral details :${req.body.extraDetails}. The length of the persona should be ${req.body.length}.`

    try {
        const response = await openai.createChatCompletion({
            model: "ft:gpt-3.5-turbo-0613:monash-university::7zeXhsat",
            messages: [
                {
                    "role": "system",
                    "content": "You are an assistant that specializes in creating detailed personas following a bullet-point approach.The response should only include internal and external human factors in the json string."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        });

        const generatedPersona = response.data.choices[0]?.message?.content.trim();

        if (generatedPersona) {
            res.json({ persona: generatedPersona });
        } else {
            res.status(400).json({ error: 'No persona generated' });
        }

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate persona', details: error.response?.data || error.message });
    }
}

exports.getUsersPersona = async (req, res) => {
    try {
        const userId = req.params.userId;
        const personas = await Persona.find({ user: userId }).populate('user').exec();

        if (!personas.length) {
            return res.status(404).json({ message: "No personas found for the specified user." });
        }

        res.json(personas);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving personas.", error: error.message });
    }
}


exports.getPersonaById = async (req, res) => {
    try {

        const personaId = new ObjectId(req.params.personaId);

        const persona = await Persona.findById(personaId);
        if (!persona) {
            return res.status(404).json({ error: 'Persona not found' });
        }
        res.json(persona);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


exports.getBulletPointPersonaById = async (req, res) => {
    try {

        const personaId = new ObjectId(req.params.personaId);

        const persona = await Persona.findById(personaId);
        if (!persona) {
            return res.status(404).json({ error: 'Persona not found' });
        }
        res.json(persona);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }

}
