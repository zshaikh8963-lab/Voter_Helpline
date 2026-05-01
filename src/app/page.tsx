'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Search, 
  MapPin, 
  MessageCircle, 
  Users, 
  Calendar,
  Award,
  ChevronRight,
  Sparkles,
  Map,
  Vote,
  BookOpen,
  HelpCircle,
  Phone,
  Globe,
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  Home as HomeIcon
} from 'lucide-react'
import AIAssistant from '../components/ai-assistant'
import { useLanguage } from '../contexts/LanguageContext'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [liveStats, setLiveStats] = useState({
    voters: '94.5M',
    pollingStations: '1.05M',
    states: '28'
  })
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-saffron-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-dark z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-saffron-600" />
            <span className="text-xl font-bold gradient-text">मतदार मदत</span>
            <span className="text-sm text-gray-600 ml-2">(Voter Helpline)</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button className="nav-item flex items-center space-x-1">
              <HomeIcon className="h-4 w-4" />
              <span>{t('nav.home')}</span>
            </button>
            <button className="nav-item flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{t('nav.aiAssistant')}</span>
            </button>
            <button className="nav-item flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>{t('nav.voterGuide')}</span>
            </button>
            <button className="nav-item flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{t('nav.pollingBooths')}</span>
            </button>
            <button className="nav-item flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{t('nav.contact')}</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors">
                <Globe className="h-4 w-4" />
                <span className="text-sm">{languages.find(l => l.code === language)?.flag}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className="flex items-center space-x-3 w-full px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm text-gray-700">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-2 rounded-full transition-colors flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>{t('nav.askAI')}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-saffron-100 text-saffron-800 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">{t('hero.poweredBy')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">{t('hero.title1')}</span>
              <br />
              <span className="text-gray-900">{t('hero.title2')}</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button className="bg-saffron-500 hover:bg-saffron-600 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
              <Search className="h-5 w-5" />
              <span>{t('btn.checkVoterStatus')}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button className="bg-navy-500 hover:bg-navy-600 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
              <MapPin className="h-5 w-5" />
              <span>{t('btn.findPollingBooth')}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button className="border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50 px-8 py-4 rounded-full font-medium transition-all hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
              <MessageCircle className="h-5 w-5" />
              <span>{t('btn.askAIAssistant')}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Live Stats Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold gradient-text">{liveStats.voters}</div>
              <div className="text-sm text-gray-600">{t('stats.registeredVoters')}</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold gradient-text">{liveStats.pollingStations}</div>
              <div className="text-sm text-gray-600">{t('stats.pollingStations')}</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold gradient-text">{liveStats.states}</div>
              <div className="text-sm text-gray-600">{t('stats.states')}</div>
            </div>
          </motion.div>
        </div>

              </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">{t('features.everythingYouNeed')}</span>
              <br />
              <span className="text-gray-900">{t('features.toVoteConfidently')}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('features.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "मतदार नोंदणी",
                description: "मतदार म्हणून नोंदणी करण्याची चरण-दर-चरण मार्गदर्शिका",
                color: "saffron",
                steps: ["फॉर्म भरा", "दस्तऐवज संकलित करा", "ऑनलाइन जमा करा", "स्थिती तपासा"]
              },
              {
                icon: MapPin,
                title: "मतदान केंद्र शोधक",
                description: "तुमचे सर्वात जवळचे मतदान केंद्र तात्काळ शोधा",
                color: "navy",
                steps: ["पत्ता टाका", "केंद्र शोधा", "मार्ग दाखवा", "संपर्क तपासा"]
              },
              {
                icon: Calendar,
                title: "निवडणूक वेळापत्रक",
                description: "महत्त्वाच्या निवडणूक तारखा कधीही गमावू नका",
                color: "saffron",
                steps: ["तारखा पाहा", "स्मरणपत्रे सेट करा", "अपडेट्स मिळवा", "अधिकारींशी बोला"]
              },
              {
                icon: BookOpen,
                title: "नागरिक शिक्षण",
                description: "निवडणूक प्रक्रिया समजून घ्या",
                color: "navy",
                steps: ["मूलभूत जाणून घ्या", "नियम समजा", "हक्क जाणून घ्या", "अधिक माहिती मिळवा"]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg card-hover"
              >
                <div className={`w-16 h-16 ${feature.color === 'saffron' ? 'bg-orange-100' : 'bg-blue-100'} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <feature.icon className={`h-8 w-8 ${feature.color === 'saffron' ? 'text-orange-600' : 'text-blue-600'}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 mb-4 text-center text-sm">{feature.description}</p>
                
                {/* Step-by-step guide */}
                <div className="space-y-2">
                  {feature.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center space-x-2 text-sm">
                      <div className={`w-5 h-5 ${feature.color === 'saffron' ? 'bg-orange-500' : 'bg-blue-500'} text-white rounded-full flex items-center justify-center text-xs`}>
                        {stepIndex + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`mt-4 w-full ${feature.color === 'saffron' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2`}>
                  <span>सुरु करा</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">{t('faq.title')}</span>
              <br />
              <span className="text-gray-900">{t('faq.subtitle')}</span>
            </h2>
            <p className="text-xl text-gray-600">
              {t('faq.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "मी मतदार म्हणून नोंदणी कसे करू शकतो?",
                answer: "आपण ऑनलाइन किंवा तुमच्या जवळच्या मतदान कार्यालयात नोंदणी करू शकता. आपल्याला फॉर्म 6 भरावा लागेल आणि आवश्यक दस्तऐवज जमा करावे लागतील."
              },
              {
                question: "माझे मतदान केंद्र कोठे आहे हे मी कसे शोधू शकतो?",
                answer: "आपण आमच्या मतदान केंद्र शोधक वापरून तुमचा पत्ता टाकून तुमचे मतदान केंद्र शोधू शकता. किंवा आपण 1950 वर कॉल करू शकता."
              },
              {
                question: "मतदान करण्यासाठी कोणते दस्तऐवज आवश्यक आहेत?",
                answer: "आपल्याला तुमचे फोटो ओळखपत्र (वोटर आयडी, आधार कार्ड, पासपोर्ट, ड्रायव्हिंग लायसन्स) आणणे आवश्यक आहे."
              },
              {
                question: "मी मतदान करण्यासाठी किमान वय किती असणे आवश्यक आहे?",
                answer: "भारतात मतदान करण्यासाठी आपण किमान 18 वर्षांचे असणे आवश्यक आहे आणि तुमचे नाव मतदार यादीत असणे आवश्यक आहे."
              },
              {
                question: "मी ऑनलाइन मतदान करू शकतो का?",
                answer: "सध्या, भारतात ऑनलाइन मतदानाची सुविधा नाही. आपण केवळ नियुक्त मतदान केंद्रावर भौतिकरित्या मतदान करू शकता."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <div className="flex items-start space-x-3">
                  <HelpCircle className="h-6 w-6 text-saffron-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl p-8 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">अधिक मदतीची आवश्यकता आहे?</h2>
            <p className="text-xl mb-6">आमचे AI सहाय्यक 24/7 उपलब्ध आहे किंवा आपण आम्हाला कॉल करू शकता</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>AI सहाय्यक वापरा</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-white/30 transition-colors flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>1950 वर कॉल करा</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  )
}
