import { NextResponse } from "next/server"
import OpenAI from "openai"

const systemPrompt = 'You are an AI voice application model that determines when a person is done talking given their live transcription. Please analyze the live transcription to determine when the person has finished speaking.'