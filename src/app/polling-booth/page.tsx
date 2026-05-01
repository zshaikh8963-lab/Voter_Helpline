'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Search, 
  Navigation, 
  Clock, 
  Users, 
  Phone, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Info,
  Route,
  Map,
  Filter
} from 'lucide-react'

interface PollingStation {
  id: string
  name: string
  address: string
  distance: string
  estimatedTime: string
  crowdLevel: 'low' | 'medium' | 'high'
  facilities: string[]
  contactNumber: string
  timing: string
  coordinates: { lat: number; lng: number }
}

export default function PollingBoothFinder() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStation, setSelectedStation] = useState<PollingStation | null>(null)
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')
  const [pollingStations, setPollingStations] = useState<PollingStation[]>([])
  const [loading, setLoading] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Fetch polling stations from API
  const fetchPollingStations = async (searchQuery?: string, crowdFilter?: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      
      if (userLocation) {
        params.append('lat', userLocation.lat.toString())
        params.append('lng', userLocation.lng.toString())
      }
      
      if (searchQuery) {
        params.append('search', searchQuery)
      }
      
      if (crowdFilter && crowdFilter !== 'all') {
        params.append('crowdLevel', crowdFilter)
      }

      const response = await fetch(`/api/polling-booths?${params.toString()}`)
      const data = await response.json()

      if (response.ok) {
        // Transform API response to match our interface
        const transformedStations = data.pollingBooths.map((station: any) => ({
          id: station.id,
          name: station.name,
          address: station.address,
          distance: station.distance ? `${station.distance.toFixed(1)} km` : 'Unknown',
          estimatedTime: station.estimatedTime ? `${station.estimatedTime} min walk` : 'Unknown',
          crowdLevel: station.crowdLevel,
          facilities: station.facilities,
          contactNumber: station.contactNumber,
          timing: station.timing,
          coordinates: station.coordinates
        }))
        
        setPollingStations(transformedStations)
      } else {
        console.error('Failed to fetch polling stations:', data.error)
        setPollingStations([])
      }
    } catch (error) {
      console.error('Error fetching polling stations:', error)
      setPollingStations([])
    } finally {
      setLoading(false)
    }
  }

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(location)
          fetchPollingStations(searchQuery, filter)
        },
        (error) => {
          console.error('Error getting location:', error)
          fetchPollingStations(searchQuery, filter)
        }
      )
    } else {
      fetchPollingStations(searchQuery, filter)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchPollingStations()
  }, [])

  // Fetch when search or filter changes
  useEffect(() => {
    fetchPollingStations(searchQuery, filter)
  }, [searchQuery, filter, userLocation])

  const filteredStations = pollingStations

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCrowdIcon = (level: string) => {
    switch (level) {
      case 'low': return <Users className="h-4 w-4" />
      case 'medium': return <Users className="h-4 w-4" />
      case 'high': return <Users className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-saffron-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-dark z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-saffron-600" />
            <span className="text-xl font-bold gradient-text">Polling Booth Finder</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button className="nav-item">Home</button>
            <button className="nav-item">Registration</button>
            <button className="nav-item">Find Booth</button>
            <button className="nav-item">Election Info</button>
          </div>

          <button className="bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-2 rounded-full transition-colors">
            Get Directions
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Find Your Polling Booth</span>
              <br />
              <span className="text-gray-900">Quick & Easy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Locate your nearest polling station, check crowd levels, and get real-time directions. Make voting day stress-free!
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your area, pincode, or landmark..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron-500"
                  />
                </div>
                <button 
                  onClick={getCurrentLocation}
                  className="bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Use GPS</span>
                </button>
              </div>

              {/* Filter Options */}
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-sm font-medium text-gray-700">Crowd Level:</span>
                <div className="flex space-x-2">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFilter(option.value as any)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        filter === option.value
                          ? 'bg-saffron-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Stations List */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold mb-6">Nearby Polling Stations</h2>
                
                <div className="space-y-4">
                  {filteredStations.map((station, index) => (
                    <motion.div
                      key={station.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => setSelectedStation(station)}
                      className={`bg-white rounded-xl p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                        selectedStation?.id === station.id ? 'ring-2 ring-saffron-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{station.name}</h3>
                          <p className="text-gray-600 mb-3">{station.address}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="inline-flex items-center space-x-1 text-sm text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{station.distance}</span>
                            </span>
                            <span className="inline-flex items-center space-x-1 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{station.estimatedTime}</span>
                            </span>
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getCrowdColor(station.crowdLevel)}`}>
                              {getCrowdIcon(station.crowdLevel)}
                              <span>{station.crowdLevel} crowd</span>
                            </span>
                          </div>
                        </div>
                        
                        <button className="ml-4 p-2 bg-saffron-100 text-saffron-600 rounded-lg hover:bg-saffron-200 transition-colors">
                          <Navigation className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{station.contactNumber}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{station.timing}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Station Details / Map */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="sticky top-24"
              >
                {selectedStation ? (
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Map Placeholder */}
                    <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                      <div className="text-center">
                        <Map className="h-16 w-16 text-blue-600 mx-auto mb-2" />
                        <p className="text-gray-700 font-medium">Interactive Map</p>
                        <p className="text-sm text-gray-500">Click to get directions</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">{selectedStation.name}</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                          <p className="text-gray-600">{selectedStation.address}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Available Facilities</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedStation.facilities.map((facility, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                              >
                                {facility}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Distance</h4>
                            <p className="text-gray-600">{selectedStation.distance}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Est. Time</h4>
                            <p className="text-gray-600">{selectedStation.estimatedTime}</p>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                          <button className="w-full bg-saffron-500 hover:bg-saffron-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                            <Route className="h-5 w-5" />
                            <span>Get Directions</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Polling Station</h3>
                    <p className="text-gray-600">
                      Click on any polling station from the list to view detailed information and get directions.
                    </p>
                  </div>
                )}
                
                {/* Tips Card */}
                <div className="mt-6 bg-blue-50 rounded-2xl p-6">
                  <div className="flex items-start space-x-3">
                    <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Voting Day Tips</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Carry your Voter ID card</li>
                        <li>• Reach early to avoid crowds</li>
                        <li>• Follow COVID guidelines</li>
                        <li>• Check facilities in advance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
