import { NextRequest, NextResponse } from 'next/server'

// Mock database for demonstration
const mockApplications = [
  {
    id: 'VR001',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@email.com',
    phone: '+91-9876543210',
    status: 'pending',
    submittedDate: '2024-01-15',
    estimatedCompletion: '2024-02-15'
  },
  {
    id: 'VR002', 
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91-9876543211',
    status: 'approved',
    submittedDate: '2024-01-10',
    completedDate: '2024-02-05'
  }
]

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'address', 'age', 'constituency']
    const missingFields = requiredFields.filter(field => !applicationData[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          missingFields 
        },
        { status: 400 }
      )
    }

    // Generate application ID
    const applicationId = `VR${Date.now().toString().slice(-3)}`

    // Create new application
    const newApplication = {
      id: applicationId,
      ...applicationData,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
      estimatedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
    }

    // In a real app, save to database
    mockApplications.push(newApplication)

    return NextResponse.json({
      message: 'Voter registration application submitted successfully',
      application: newApplication,
      nextSteps: [
        'Your application has been submitted for review',
        'You will receive a confirmation SMS and email',
        'Application processing typically takes 30 days',
        'You can track your status using the application ID'
      ]
    })

  } catch (error) {
    console.error('Voter Registration API Error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const applicationId = searchParams.get('id')
    const email = searchParams.get('email')
    const phone = searchParams.get('phone')

    let applications = mockApplications

    // Filter by parameters
    if (applicationId) {
      applications = applications.filter(app => app.id === applicationId)
    } else if (email) {
      applications = applications.filter(app => app.email === email)
    } else if (phone) {
      applications = applications.filter(app => app.phone === phone)
    }

    return NextResponse.json({
      applications,
      count: applications.length
    })

  } catch (error) {
    console.error('Get Voter Registration API Error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve applications' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { applicationId, status, notes } = await request.json()

    if (!applicationId || !status) {
      return NextResponse.json(
        { error: 'Application ID and status are required' },
        { status: 400 }
      )
    }

    // Find and update application
    const applicationIndex = mockApplications.findIndex(app => app.id === applicationId)
    
    if (applicationIndex === -1) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    mockApplications[applicationIndex] = {
      ...mockApplications[applicationIndex],
      status,
      notes,
      lastUpdated: new Date().toISOString(),
      ...(status === 'approved' && { completedDate: new Date().toISOString().split('T')[0] })
    }

    return NextResponse.json({
      message: 'Application status updated successfully',
      application: mockApplications[applicationIndex]
    })

  } catch (error) {
    console.error('Update Voter Registration API Error:', error)
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    )
  }
}
