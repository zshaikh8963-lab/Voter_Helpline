'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Download,
  Upload,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Camera,
  HelpCircle,
  Clock
} from 'lucide-react'

interface RegistrationStep {
  id: number
  title: string
  description: string
  icon: any
  documents: string[]
  estimatedTime: string
}

const registrationSteps: RegistrationStep[] = [
  {
    id: 1,
    title: "Check Eligibility",
    description: "Verify you meet all requirements to register as a voter",
    icon: CheckCircle,
    documents: ["Age proof (18+)", "Indian citizenship"],
    estimatedTime: "5 minutes"
  },
  {
    id: 2,
    title: "Gather Documents",
    description: "Collect all required documents for the registration process",
    icon: FileText,
    documents: ["Address proof", "Age proof", "Photograph"],
    estimatedTime: "15 minutes"
  },
  {
    id: 3,
    title: "Fill Form 6",
    description: "Complete the voter registration form online or offline",
    icon: FileText,
    documents: ["Form 6 (filled)", "Supporting documents"],
    estimatedTime: "20 minutes"
  },
  {
    id: 4,
    title: "Submit Application",
    description: "Submit your application through the preferred channel",
    icon: Upload,
    documents: ["Completed form", "All documents"],
    estimatedTime: "10 minutes"
  },
  {
    id: 5,
    title: "Track Status",
    description: "Monitor your application status until approval",
    icon: Clock,
    documents: ["Application reference number"],
    estimatedTime: "30 days"
  }
]

const requiredDocuments = [
  { name: "Address Proof", examples: ["Aadhaar Card", "Passport", "Driving License", "Utility Bills"] },
  { name: "Age Proof", examples: ["Birth Certificate", "School Certificate", "Aadhaar Card"] },
  { name: "Photograph", examples: ["Passport size photo (white background)", "Recent photo (within 6 months)"] }
]

export default function VoterRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  const toggleDocument = (doc: string) => {
    setSelectedDocuments(prev => 
      prev.includes(doc) 
        ? prev.filter(d => d !== doc)
        : [...prev, doc]
    )
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
            <Users className="h-8 w-8 text-saffron-600" />
            <span className="text-xl font-bold gradient-text">Voter Registration Guide</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button className="nav-item">Home</button>
            <button className="nav-item">Registration</button>
            <button className="nav-item">Documents</button>
            <button className="nav-item">Track Status</button>
          </div>

          <button className="bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-2 rounded-full transition-colors">
            Get Help
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
              <span className="gradient-text">Register to Vote</span>
              <br />
              <span className="text-gray-900">Step-by-Step Guide</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Complete your voter registration in 5 simple steps. Our AI-powered guide will help you through every stage of the process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            {registrationSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    currentStep >= step.id
                      ? 'bg-saffron-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <step.icon className="h-6 w-6" />
                </motion.div>
                {index < registrationSteps.length - 1 && (
                  <div className={`w-full h-1 mx-2 transition-colors ${
                    currentStep > step.id ? 'bg-saffron-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              Step {currentStep}: {registrationSteps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600 mb-4">{registrationSteps[currentStep - 1].description}</p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{registrationSteps[currentStep - 1].estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Step Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6">What You Need</h3>
              
              <div className="space-y-6">
                {registrationSteps[currentStep - 1].documents.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-saffron-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-saffron-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{doc}</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {doc.includes("Address") && "Any government-issued document with your current address"}
                        {doc.includes("Age") && "Document proving you are 18 years or older"}
                        {doc.includes("Photograph") && "Recent passport-sized photograph"}
                        {doc.includes("Form 6") && "Official voter registration form"}
                        {doc.includes("reference") && "Number received after submission"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Pro Tip</h4>
                    <p className="text-blue-800 text-sm">
                      {currentStep === 1 && "Double-check your age and citizenship status before proceeding. You must be 18+ and an Indian citizen."}
                      {currentStep === 2 && "Keep digital copies of all documents ready. This will speed up the online application process."}
                      {currentStep === 3 && "Fill the form carefully. Any mistakes can lead to rejection or delays."}
                      {currentStep === 4 && "Choose online submission for faster processing. You'll receive instant confirmation."}
                      {currentStep === 5 && "Save your reference number safely. You'll need it to track your application status."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  disabled={currentStep === 5}
                  className="px-6 py-3 bg-saffron-500 text-white rounded-lg hover:bg-saffron-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Document Checklist */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-6">Document Checklist</h3>
              
              <div className="space-y-4">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{doc.name}</h4>
                    <div className="space-y-1">
                      {doc.examples.map((example, idx) => (
                        <label key={idx} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedDocuments.includes(example)}
                            onChange={() => toggleDocument(example)}
                            className="rounded text-saffron-500 focus:ring-saffron-500"
                          />
                          <span className="text-sm text-gray-600">{example}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-saffron-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-saffron-600" />
                  <span className="font-semibold text-saffron-900">Progress</span>
                </div>
                <div className="text-2xl font-bold text-saffron-600">
                  {selectedDocuments.length} / {requiredDocuments.reduce((acc, doc) => acc + doc.examples.length, 0)} documents
                </div>
                <div className="w-full bg-saffron-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-saffron-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(selectedDocuments.length / (requiredDocuments.reduce((acc, doc) => acc + doc.examples.length, 0))) * 100}%` }}
                  />
                </div>
              </div>

              <button className="w-full mt-6 bg-navy-500 hover:bg-navy-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Form 6</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
