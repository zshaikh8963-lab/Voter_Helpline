import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test environment variables
    const apiKey = process.env.OPENAI_API_KEY
    const apiKeyExists = !!apiKey
    const apiKeyFormat = apiKey?.startsWith('sk-or-v1') || apiKey?.startsWith('sk-')
    
    return NextResponse.json({
      status: 'API Test Endpoint Working',
      environment: {
        apiKeyExists,
        apiKeyFormat,
        apiKeyPrefix: apiKey?.substring(0, 10) + '...',
        nodeEnv: process.env.NODE_ENV
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Test endpoint failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    return NextResponse.json({
      message: 'POST test successful',
      receivedData: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      error: 'POST test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
