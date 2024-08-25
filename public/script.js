// Using the web audip API for recording audio from the user's microphone

let mediaRecorder;
let audioChunks = []

document.getElementById('recordButton').addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();
    document.getElementById('recordButton').disabled = true;
    document.getElementById('stopButton').disabled = false;

    mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        audioChunks = [];
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.wav');

        const response = await fetch('/api/voice', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        document.getElementById('output').innerText = result.text;
    }
});

document.getElementById('stopButton').addEventListener('click', () => {
    mediaRecorder.stop();
    document.getElementById('recordButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
})