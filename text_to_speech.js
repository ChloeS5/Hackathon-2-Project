
const axios = require('axios');
const fs = require('fs');




//Here is the ElevenLabs API
const API_KEY = 'sk_3775f0d9a3e50796830ae400b5d1b4792117d64f9e7dcac9'
const API_URL = 'https://api.elevenlabs.io/v1/text-to-speech'

async function textToSpeech(text) {
    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    };
    const data = {
        text: text,
        voice: 'en_us_female',
        model: 'elevenlabs'
    };

    try {
        const response = await axios.post(API_URL, data, { headers: headers });

        if (response.status === 200) {
            fs.writeFileSync('output.wav', response.data);
            console.log("Audio saved as output.wav");

        } else {
            console.error(`Error: ${response.status} - ${response.data}`);
        } 
    } catch (error) {
            console.error(`Error: ${error.response.status} - ${error.response.data}`);
        }
    }

    //Ex. of usage
    textToSpeech("Hey, this is test 1 of ElevenLabs text-to-speech conversion, congratulations")


