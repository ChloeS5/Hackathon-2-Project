const fs = require('fs')
const { spawn } = require( 'child_process');

function transcribeMyAudio(filePath) {
    return new Promise((resolve, reject) => {
        const process = spawn('python3', ['-m', 'whisper', filePath, '--model', 'base', '--output_format', 'txt']);

        process.stdout.on('data', (data) => {
            resolve(data.toString());
        })

        process.stderr.on('data', (data) => {
            reject(data.toString());
        })
    })
}

// Example using it , prob remove later

transcribeMyAudio('path/to/audio/file.wav')
    .then(transcription => console.log(transcription))
    .catch(error => console.error(error));