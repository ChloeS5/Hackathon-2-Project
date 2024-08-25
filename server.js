require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const OpenAIApi = require('openai'); // Adjusted import
const { transcribeMyAudio } = require('./speechRecognition');


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const audioFilePath = req.body.audioFilePath;

    try {
        const userMessage = await transcribeMyAudio(audioFilePath);

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],

        });

        const botMessage = response.choices[0].message.content;
        res.json({ reply: botMessage });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error to generate a response');
    }
});

//So with code above Whisper can be used for speech recogn. in AI voice agent now.

//Defining a root for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the OpenAI Chat Server I just made yay!'); //This is the root path response
})
// Ends here

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY, // Directly pass the API key
});

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        });

        const botMessage = response.data.choices[0].message.content;
        res.json({ reply: botMessage });
    } catch (error) {
        console.error(error);
        res.status(500).send('This is an error generated response');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});