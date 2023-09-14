const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const path = require('path');


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

let narrativeUnstructuredExample = 
`Using the narrative unstructured medium approach, craft a persona's description in the style of the provided example below. The content of the example is not important and should not be reused. Begin directly with the new persona's description without any preamble or introductory statement.
For style reference only:
Teresa is eight years old and is a third-grade student at St. Augustine Elementary School, a public school. She lives with her mother and father (Maria and Oscar Dieste) in a dormitory town around Madrid, Spain. Teresa has been using computers at school since kindergarten and has had her own computer at home for a year. She has very occasionally used the Internet at home to search for information related to her school work under her parents' supervision.
Even though Teresa loves to be physically active (she is a keen rhythmic gymnast, dancer and skateboarder), she thinks computers are really, really fun. She uses the Mac mostly to play princess games (dress-up, Dora the explorer, and so), and watch videos on iTunes. Santa Claus brought her a Nintendo DS® console last Christmas. Her current favourite is Cooking Mama 4, although she also likes educational games.
Teresa also loves TV so much so that her parents have decided to get rid of the only television set that they had at home. Instead they have a password-protected Boxee Box where Teresa can sometimes watch TV over IP. Teresa is not very happy about not having TV at home, but she did not like what her parents told about TV "eating your brain" and has stoically accepted. Her 4-year-old sister Alba goes nowhere near a TV since she heard that it could eat things.`;



let bulletpointStructuredExample =  `
sing the bulletpoint structured short  approach, craft a persona's description in the style of the provided example below. The content of the example is not important and should not be reused. Begin directly with the new persona's description without any preamble or introductory statement.
For style reference only:
{
    "InternalLayer": {
        "Name": "Lucas",
        "Age": "10",
        "Gender": "Male",
        "Interest": "Video games, robotics, and adventure stories",
        "Education": "5th Grade at Parkwood Elementary",
        "Hobby": "Building Lego structures, reading comic books, and coding basic games",
        "Habit": "Plays games for an hour after school before starting homework",
        "Emotion": "Gets excited about new game releases, but feels sad if he can't achieve a game level",
        "Activity": "Attends a robotics club on weekends",
        "Personality": "Curious, intelligent, competitive, and a bit introverted",
        "Privacy": "Uses the internet under parental guidance, and doesn't share personal details online"
    },
    "ExternalLayer": {
        "Motivation": "Wants to build his own video game one day",
        "Goal": "Learn advanced coding by the age of 15",
        "Concern": "Fears that spending too much time on games might affect his grades",
        "Language": "English, with basic understanding of French from school",
        "ComfortWithTechnology": "Very high; often helps his parents troubleshoot tech issues",
        "Location": "Suburban house in Austin, Texas",
        "Skill": "Good problem-solving skills, especially in mathematics",
        "Behaviour": "Prioritizes game time, but ensures to allocate time for homework",
        "LifeExperience": "Once mistakenly downloaded malware which led to a strong lesson about online safety",
        "FamilyStructure": "Lives with both parents and a younger sister, Mia",
        "LivingArrangement": "Family home with a dedicated playroom filled with tech toys and board games",
        "Occupation": "Elementary school student and junior coder at a local tech club"
    }
}`
;



const prompt = `
I want you to act as a persona generator based on the following attributes and you should follow the provided example dimensions:

1. **Domain**: 
    - Child technology users
    - Elementary school education
    - Entertainment and gaming for kids

2. **Human Factors**:
   - **Internal Layer**:
     - Name
     - Age
     - Gender
     - Interest
     - Education
     - Hobby
     - Habit
     - Emotion
     - Activity
     - Personality/personal attribute
     - Privacy

   - **External Layer**:
     - Motivation (compulsory)
     - Goal (compulsory)
     - Concern/frustration/pain point (compulsory)
     - Language
     - Comfort with technology
     - Location
     - Skill
     - Behaviour
     - Life experience
     - Family structure
     - Living arrangement
     - Occupation

3. **Extra Details**: 
    - Family once had a television set but decided to remove it because child is addicted on.
    - Usage of a password-protected Boxee Box for watching TV over IP.
    - Younger sister's belief regarding TVs.

4. **First Dimension**: Narrative approach

5. **Second Dimension**: Unstructured

6. **Third Dimension**: Medium

Please noted that the varibales first dimension, second dimension and third dimension should be combined as one variable at the end such as narrative unstructured medium approach.
`;


app.post('/generatePersona', async (req, res) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    "role": "assistant",
                    "content": narrativeUnstructuredExample
                },
                {
                    "role": "user",
                    "content": prompt
                },
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
});



app.post('/generateStructuredPersona', async (req, res) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    "role": "assistant",
                    "content": bulletpointStructuredExample
                },
                {
                    "role": "user",
                    "content": prompt
                },
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
});





app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

