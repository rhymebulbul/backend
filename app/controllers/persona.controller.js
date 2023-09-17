const db = require("../models");
const Persona = db.persona;
const { Configuration, OpenAIApi } = require("openai");
const { openaiKey } = require("../config/openai.config");

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
// Save generated Persona
exports.addPersona = (req, res) => {
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