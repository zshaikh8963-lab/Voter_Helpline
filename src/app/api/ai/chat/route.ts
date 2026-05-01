import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client with OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'Voter Helpline AI Assistant',
  }
})

// AI Assistant personality prompts
const personalityPrompts = {
  professional: "You are a professional AI Election Assistant. Provide formal, accurate, and comprehensive information about elections, voting procedures, and civic processes in India. Maintain a professional tone and cite official sources when possible.",
  friendly: "You are a friendly AI Election Assistant. Explain voting and election concepts in a warm, approachable manner. Use simple language and be encouraging. Make complex topics easy to understand for everyone.",
  genz: "You are a Gen Z AI Election Assistant. Use modern, casual language with relevant emojis and slang when appropriate. Make voting cool and relatable for young audiences. Keep it brief and engaging.",
  teacher: "You are a teacher AI Election Assistant. Explain concepts step-by-step, provide examples, and ask questions to ensure understanding. Be patient and thorough in your explanations."
}

export async function POST(request: NextRequest) {
  try {
    const { message, personality = 'friendly', conversationHistory = [] } = await request.json()

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Valid message is required' },
        { status: 400 }
      )
    }

    
    // Build conversation context
    const systemPrompt = personalityPrompts[personality as keyof typeof personalityPrompts] || personalityPrompts.friendly
    
    // Add election-specific context
    const electionContext = `
    Context: You are helping with Indian elections. Key information:
    - Voting age in India: 18 years
    - Election Commission of India (ECI) is the governing body
    - Voter ID card (EPIC) is required for voting
    - Form 6 is used for voter registration
    - NOTA (None of the Above) option is available
    - EVMs (Electronic Voting Machines) are used for voting
    Current date: ${new Date().toLocaleDateString()}
    `

    // Build messages array for OpenAI
    const messages = [
      { role: 'system', content: `${systemPrompt}\n\n${electionContext}` },
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    // Validate API key first (OpenRouter keys start with 'sk-or-v1')
    if (!process.env.OPENAI_API_KEY || (!process.env.OPENAI_API_KEY.startsWith('sk-') && !process.env.OPENAI_API_KEY.startsWith('sk-or-v1'))) {
      throw new Error('Invalid API key format')
    }

    // Call OpenRouter API with detailed error handling
    console.log('Calling OpenRouter API with:', {
      model: 'anthropic/claude-3-haiku',
      messageCount: messages.length,
      hasApiKey: !!process.env.OPENAI_API_KEY
    });

    // Try multiple models in order of preference
    let completion;
    const models = ['anthropic/claude-3-haiku', 'openai/gpt-3.5-turbo', 'google/gemini-pro'];
    
    for (const model of models) {
      try {
        completion = await openai.chat.completions.create({
          model,
          messages,
          max_tokens: 500,
          temperature: 0.7,
        });
        console.log(`Successfully used model: ${model}`);
        break;
      } catch (modelError) {
        console.log(`Model ${model} failed, trying next...`);
        if (model === models[models.length - 1]) {
          throw modelError; // Re-throw if all models fail
        }
      }
    }

    console.log('OpenRouter response received:', {
      hasChoices: !!completion.choices,
      choiceCount: completion.choices?.length,
      hasContent: !!completion.choices?.[0]?.message?.content
    });

    const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I cannot process your request at the moment.'

    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('AI Chat API Error:', error)
    
    // Fallback response if OpenAI fails
    const fallbackResponses = [
      "I'm having trouble connecting to my AI services right now. For voter registration, visit the Election Commission website or call 1950 for assistance.",
      "My AI capabilities are temporarily unavailable. For polling booth information, please use the Voter Helpline app or visit your nearest election office.",
      "I'm experiencing technical difficulties. For election-related queries, please visit https://eci.gov.in or call the voter helpline at 1950."
    ]

    return NextResponse.json({
      response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
      timestamp: new Date().toISOString(),
      fallback: true
    })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Chat API is running',
    personalities: Object.keys(personalityPrompts),
    endpoints: {
      chat: 'POST /api/ai/chat - Send messages to AI assistant'
    }
  })
}
