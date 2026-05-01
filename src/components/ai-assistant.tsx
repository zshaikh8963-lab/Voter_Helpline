'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  Mic,
  MicOff,
  User,
  Bot,
  Sparkles,
  HelpCircle,
  BookOpen,
  MapPin,
  Calendar,
  Users,
  Cpu,
  Zap,
  Activity,
  Wifi
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  typing?: boolean
}

interface QuickAction {
  id: string
  label: string
  icon: any
  message: string
}

const quickActions: QuickAction[] = [
  { id: '1', label: 'Check Voter Status', icon: Users, message: 'How do I check my voter registration status?' },
  { id: '2', label: 'Find Polling Booth', icon: MapPin, message: 'Where is my nearest polling booth?' },
  { id: '3', label: 'Election Dates', icon: Calendar, message: 'When are the next elections?' },
  { id: '4', label: 'Voter Registration', icon: BookOpen, message: 'How do I register to vote?' },
]

const aiPersonalities = [
  { id: 'professional', name: 'Professional', emoji: '👔' },
  { id: 'friendly', name: 'Friendly', emoji: '😊' },
  { id: 'genz', name: 'Gen Z', emoji: '🎭' },
  { id: 'teacher', name: 'Teacher', emoji: '🎓' },
]

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '👋 Hello! I\'m your AI Election Assistant. I can help you with voter registration, finding polling booths, understanding the election process, and much more. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [selectedPersonality, setSelectedPersonality] = useState('friendly')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Call AI chat API
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          personality: selectedPersonality,
          conversationHistory: messages.slice(1).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }))
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'ai',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      } else {
        // Show detailed error to user
        const errorText = `API Error: ${data.error || 'Unknown error'}`
        const fallbackResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: errorText,
          sender: 'ai',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, fallbackResponse])
      }
    } catch (error) {
      console.error('AI API Error:', error)
      console.error('Error details:', {
        message: inputValue,
        personality: selectedPersonality,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      
      // Fallback to simulated response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, fallbackResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('voter status') || input.includes('registration')) {
      return 'To check your voter registration status, you can visit the official Election Commission website or use the Voter Helpline app. You\'ll need to enter your EPIC number or personal details. Would you like me to guide you through the process step by step?'
    } else if (input.includes('polling booth') || input.includes('where to vote')) {
      return 'You can find your polling booth by using the Voter Helpline app or website. Enter your address or constituency details, and it will show you the exact location with map directions. The booth information is also printed on your Voter ID card.'
    } else if (input.includes('election dates') || input.includes('when')) {
      return 'Election dates are announced by the Election Commission of India. For the 2024 Lok Sabha elections, voting will be conducted in 7 phases from April 19 to June 1, 2024. Results will be counted on June 4, 2024. Would you like to know the specific dates for your state?'
    } else if (input.includes('register') || input.includes('how to vote')) {
      return 'To register as a voter, you need to fill Form 6 available on the Election Commission website. You\'ll need proof of age, address, and a photograph. The process takes about 30 days. I can help you with the detailed steps if needed!'
    } else {
      return `That's a great question! Based on what you've asked, I'd recommend checking the official Election Commission resources for the most accurate and up-to-date information. Is there anything specific about the voting process I can help clarify for you?`
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    setInputValue(action.message)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative group"
        >
          {/* Animated background ring */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-xl opacity-75 group-hover:opacity-100"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Main button */}
          <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4 rounded-full shadow-2xl border border-cyan-400/30 backdrop-blur-xl">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="h-6 w-6 text-cyan-400" />
            </motion.div>
            
            {/* Pulsing dots */}
            <div className="absolute -top-1 -right-1 flex space-x-1">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 bg-blue-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </div>
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20, rotateX: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      className="fixed bottom-6 right-6 w-[420px] h-[650px] z-50 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30">
        <div className="absolute inset-0 backdrop-blur-2xl bg-black/40" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-400/10" 
               style={{ 
                 backgroundImage: `
                   linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '20px 20px'
               }} 
          />
        </div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ 
              x: Math.random() * 400, 
              y: Math.random() * 650,
              opacity: Math.random()
            }}
            animate={{ 
              x: Math.random() * 400,
              y: Math.random() * 650,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
          />
        ))}
      </div>
      
      {/* Main container with glassmorphism */}
      <motion.div 
        className="relative h-full backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-3xl shadow-2xl overflow-hidden"
        whileHover={{ borderColor: 'rgba(6, 182, 212, 0.4)' }}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-4 backdrop-blur-xl border-b border-cyan-400/20">
          {/* Animated header background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <div className="p-2 bg-cyan-400/20 rounded-full border border-cyan-400/30">
                    <Cpu className="h-5 w-5 text-cyan-300" />
                  </div>
                </motion.div>
                <div>
                  <span className="font-bold text-white text-lg tracking-wide">AI Election Assistant</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-cyan-200">ONLINE</span>
                    <Wifi className="h-3 w-3 text-cyan-300" />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-105"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4 text-white" /> : <Minimize2 className="h-4 w-4 text-white" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 transition-all hover:scale-105"
                >
                  <X className="h-4 w-4 text-red-300" />
                </button>
              </div>
            </div>
            
            {/* Personality Selector */}
            <div className="flex space-x-2">
              {aiPersonalities.map(personality => (
                <motion.button
                  key={personality.id}
                  onClick={() => setSelectedPersonality(personality.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    selectedPersonality === personality.id
                      ? 'bg-cyan-400 text-gray-900 border-cyan-300 shadow-lg shadow-cyan-400/50'
                      : 'bg-white/10 text-cyan-200 border-white/20 hover:bg-white/20 hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-1">{personality.emoji}</span> {personality.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-[420px] overflow-y-auto p-4 space-y-4">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20 pointer-events-none" />
              
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <motion.div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 shadow-lg shadow-cyan-400/50' 
                            : 'bg-gradient-to-br from-purple-500 to-pink-600 border-purple-400 shadow-lg shadow-purple-400/50'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {message.sender === 'user' ? 
                          <User className="h-5 w-5 text-white" /> : 
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          >
                            <Bot className="h-5 w-5 text-white" />
                          </motion.div>
                        }
                      </motion.div>
                      
                      {/* Message bubble */}
                      <motion.div 
                        className={`relative p-3 rounded-2xl backdrop-blur-xl border ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-100 border-cyan-400/30 shadow-lg shadow-cyan-400/20'
                            : 'bg-gradient-to-br from-purple-500/20 to-pink-600/20 text-purple-100 border-purple-400/30 shadow-lg shadow-purple-400/20'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Glowing effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-2xl blur-sm ${
                            message.sender === 'user' ? 'bg-cyan-400/20' : 'bg-purple-400/20'
                          }`}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        <div className="relative z-10">
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className="text-xs opacity-70 mt-2 flex items-center space-x-2">
                            <Activity className="h-2 w-2" />
                            <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 border-2 border-purple-400 flex items-center justify-center shadow-lg shadow-purple-400/50"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Bot className="h-5 w-5 text-white" />
                    </motion.div>
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 backdrop-blur-xl shadow-lg shadow-purple-400/20">
                      <div className="flex space-x-2">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-purple-400 rounded-full"
                            animate={{ 
                              y: [0, -8, 0],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                              duration: 1, 
                              repeat: Infinity, 
                              delay: i * 0.2 
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-2">
                {quickActions.map(action => (
                  <motion.button
                    key={action.id}
                    onClick={() => handleQuickAction(action)}
                    className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/30 rounded-full text-xs font-medium text-cyan-200 transition-all backdrop-blur-sm hover:scale-105 hover:border-cyan-400/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <action.icon className="h-3 w-3" />
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-cyan-400/20 backdrop-blur-xl bg-gradient-to-t from-black/20 to-transparent">
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-3 rounded-full transition-all border ${
                    isRecording 
                      ? 'bg-red-500/20 border-red-400/50 text-red-400 shadow-lg shadow-red-400/30' 
                      : 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-400/50'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </motion.button>
                
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about voting..."
                    className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-full focus:outline-none focus:border-cyan-400/60 focus:bg-cyan-500/20 text-cyan-100 placeholder-cyan-400/60 backdrop-blur-sm transition-all"
                  />
                  
                  {/* Animated input border */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-cyan-400/30 pointer-events-none"
                    animate={{ 
                      opacity: inputValue ? [0.5, 1, 0.5] : 0,
                      scale: inputValue ? [1, 1.02, 1] : 1
                    }}
                    transition={{ duration: 2, repeat: inputValue ? Infinity : 0 }}
                  />
                </div>
                
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-full transition-all border ${
                    inputValue.trim() 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-400/50 hover:scale-105' 
                      : 'bg-gray-500/20 border-gray-400/30 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                  whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
              
              {/* Status bar */}
              <div className="flex items-center justify-between mt-3 px-2">
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-cyan-300">AI Assistant Online</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-cyan-400/60">
                  <Zap className="h-3 w-3" />
                  <span>Neural Network Active</span>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default AIAssistant
