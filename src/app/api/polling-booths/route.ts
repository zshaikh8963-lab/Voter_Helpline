import { NextRequest, NextResponse } from 'next/server'

// Mock polling booth data
const mockPollingBooths = [
  {
    id: 'PB001',
    name: 'Government Primary School',
    address: '123 Main Street, Sector 15, Delhi - 110001',
    constituency: 'New Delhi',
    district: 'Central Delhi',
    state: 'Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    facilities: ['Wheelchair Access', 'Parking', 'Drinking Water', 'Rest Rooms'],
    contactNumber: '011-23456789',
    email: 'pb001@eci.gov.in',
    timing: '7:00 AM - 6:00 PM',
    crowdLevel: 'low',
    estimatedWaitTime: '10-15 minutes',
    hasVVPAT: true,
    totalVoters: 1250,
    status: 'active'
  },
  {
    id: 'PB002',
    name: 'Community Center',
    address: '456 Park Avenue, Sector 17, Delhi - 110002',
    constituency: 'New Delhi',
    district: 'Central Delhi',
    state: 'Delhi',
    coordinates: { lat: 28.6149, lng: 77.2100 },
    facilities: ['Parking', 'Drinking Water', 'Waiting Area'],
    contactNumber: '011-34567890',
    email: 'pb002@eci.gov.in',
    timing: '7:00 AM - 6:00 PM',
    crowdLevel: 'medium',
    estimatedWaitTime: '20-30 minutes',
    hasVVPAT: true,
    totalVoters: 1890,
    status: 'active'
  },
  {
    id: 'PB003',
    name: 'Municipal Corporation Office',
    address: '789 Civic Center, Sector 18, Delhi - 110003',
    constituency: 'New Delhi',
    district: 'Central Delhi',
    state: 'Delhi',
    coordinates: { lat: 28.6159, lng: 77.2110 },
    facilities: ['Wheelchair Access', 'Parking', 'Drinking Water', 'Rest Rooms', 'Shade Area'],
    contactNumber: '011-45678901',
    email: 'pb003@eci.gov.in',
    timing: '7:00 AM - 6:00 PM',
    crowdLevel: 'high',
    estimatedWaitTime: '30-45 minutes',
    hasVVPAT: true,
    totalVoters: 2340,
    status: 'active'
  },
  {
    id: 'PB004',
    name: 'Senior Secondary School',
    address: '321 Education Road, Sector 21, Delhi - 110004',
    constituency: 'Chandni Chowk',
    district: 'Central Delhi',
    state: 'Delhi',
    coordinates: { lat: 28.6169, lng: 77.2120 },
    facilities: ['Wheelchair Access', 'Parking', 'Drinking Water'],
    contactNumber: '011-56789012',
    email: 'pb004@eci.gov.in',
    timing: '7:00 AM - 6:00 PM',
    crowdLevel: 'low',
    estimatedWaitTime: '5-10 minutes',
    hasVVPAT: true,
    totalVoters: 980,
    status: 'active'
  }
]

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const constituency = searchParams.get('constituency')
    const district = searchParams.get('district')
    const state = searchParams.get('state')
    const search = searchParams.get('search')
    const crowdLevel = searchParams.get('crowdLevel')
    const facilities = searchParams.get('facilities')

    let filteredBooths = [...mockPollingBooths]

    // Filter by location (if coordinates provided)
    if (lat && lng) {
      const userLat = parseFloat(lat)
      const userLng = parseFloat(lng)
      
      filteredBooths = filteredBooths.map(booth => ({
        ...booth,
        distance: calculateDistance(userLat, userLng, booth.coordinates.lat, booth.coordinates.lng),
        estimatedTime: Math.ceil(calculateDistance(userLat, userLng, booth.coordinates.lat, booth.coordinates.lng) * 12) // Rough estimate: 12 min per km
      })).sort((a, b) => (a as any).distance - (b as any).distance)
    }

    // Filter by constituency
    if (constituency) {
      filteredBooths = filteredBooths.filter(booth => 
        booth.constituency.toLowerCase().includes(constituency.toLowerCase())
      )
    }

    // Filter by district
    if (district) {
      filteredBooths = filteredBooths.filter(booth => 
        booth.district.toLowerCase().includes(district.toLowerCase())
      )
    }

    // Filter by state
    if (state) {
      filteredBooths = filteredBooths.filter(booth => 
        booth.state.toLowerCase().includes(state.toLowerCase())
      )
    }

    // Filter by search (address or name)
    if (search) {
      const searchLower = search.toLowerCase()
      filteredBooths = filteredBooths.filter(booth => 
        booth.name.toLowerCase().includes(searchLower) ||
        booth.address.toLowerCase().includes(searchLower)
      )
    }

    // Filter by crowd level
    if (crowdLevel) {
      filteredBooths = filteredBooths.filter(booth => booth.crowdLevel === crowdLevel)
    }

    // Filter by facilities
    if (facilities) {
      const requiredFacilities = facilities.split(',').map(f => f.trim().toLowerCase())
      filteredBooths = filteredBooths.filter(booth => 
        requiredFacilities.every(facility => 
          booth.facilities.some(boothFacility => 
            boothFacility.toLowerCase().includes(facility)
          )
        )
      )
    }

    // Get statistics
    const stats = {
      total: filteredBooths.length,
      byCrowdLevel: {
        low: filteredBooths.filter(b => b.crowdLevel === 'low').length,
        medium: filteredBooths.filter(b => b.crowdLevel === 'medium').length,
        high: filteredBooths.filter(b => b.crowdLevel === 'high').length
      },
      byConstituency: filteredBooths.reduce((acc, booth) => {
        acc[booth.constituency] = (acc[booth.constituency] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }

    return NextResponse.json({
      pollingBooths: filteredBooths,
      stats,
      filters: {
        constituency: Array.from(new Set(mockPollingBooths.map(b => b.constituency))),
        district: Array.from(new Set(mockPollingBooths.map(b => b.district))),
        state: Array.from(new Set(mockPollingBooths.map(b => b.state))),
        crowdLevels: ['low', 'medium', 'high'],
        facilities: Array.from(new Set(mockPollingBooths.flatMap(b => b.facilities)))
      }
    })

  } catch (error) {
    console.error('Polling Booths API Error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve polling booth information' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { boothId, action, data } = await request.json()

    if (!boothId || !action) {
      return NextResponse.json(
        { error: 'Booth ID and action are required' },
        { status: 400 }
      )
    }

    // Find the booth
    const boothIndex = mockPollingBooths.findIndex(booth => booth.id === boothId)
    
    if (boothIndex === -1) {
      return NextResponse.json(
        { error: 'Polling booth not found' },
        { status: 404 }
      )
    }

    // Handle different actions
    switch (action) {
      case 'update_crowd_level':
        if (data.crowdLevel) {
          mockPollingBooths[boothIndex].crowdLevel = data.crowdLevel
          mockPollingBooths[boothIndex].estimatedWaitTime = 
            data.crowdLevel === 'low' ? '5-15 minutes' :
            data.crowdLevel === 'medium' ? '20-30 minutes' :
            '30-45 minutes'
        }
        break

      case 'update_facilities':
        if (data.facilities) {
          mockPollingBooths[boothIndex].facilities = data.facilities
        }
        break

      case 'report_issue':
        // In a real app, this would create a support ticket
        return NextResponse.json({
          message: 'Issue reported successfully',
          ticketId: `TK${Date.now().toString().slice(-6)}`,
          boothId
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      message: 'Polling booth updated successfully',
      booth: mockPollingBooths[boothIndex]
    })

  } catch (error) {
    console.error('Update Polling Booth API Error:', error)
    return NextResponse.json(
      { error: 'Failed to update polling booth' },
      { status: 500 }
    )
  }
}
