import whisper

# Load the Whisper model
model = whisper.load_model("base")

# Transcribe the audio file
result = model.transcribe("/Users/chloesepulveda/Documents/DS/Hackathon/Project AI Voice/Hackathon-2-Project/file.wav")
# Print the transcription
print(result["text"])