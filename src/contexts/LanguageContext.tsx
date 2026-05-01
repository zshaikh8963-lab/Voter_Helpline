'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Language = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta'

interface Translations {
  [key: string]: {
    [key in Language]: string
  }
}

const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    hi: 'मुख्यपृष्ठ',
    bn: 'হোম',
    te: 'హోమ్',
    mr: 'मुख्यपृष्ठ',
    ta: 'முகப்பு'
  },
  'nav.aiAssistant': {
    en: 'AI Assistant',
    hi: 'AI सहाय्य',
    bn: 'AI সহায়তা',
    te: 'AI సహాయం',
    mr: 'AI सहाय्य',
    ta: 'AI உதவி'
  },
  'nav.voterGuide': {
    en: 'Voter Guide',
    hi: 'मतदार मार्गदर्शक',
    bn: 'ভোটার গাইড',
    te: 'ఓటర్ గైడ్',
    mr: 'मतदार मार्गदर्शक',
    ta: 'வாக்காளர் வழிகாட்டி'
  },
  'nav.pollingBooths': {
    en: 'Polling Booths',
    hi: 'मतदान केंद्र',
    bn: 'ভোটকেন্দ্র',
    te: 'ఓటింగ్ బూత్‌లు',
    mr: 'मतदान केंद्र',
    ta: 'வாக்குச் சாவடிகள்'
  },
  'nav.contact': {
    en: 'Contact',
    hi: 'संपर्क',
    bn: 'যোগাযোগ',
    te: 'సంప్రదింపండి',
    mr: 'संपर्क',
    ta: 'தொடர்பு'
  },
  'nav.askAI': {
    en: 'Ask AI',
    hi: 'AI शंका',
    bn: 'AI জিজ্ঞাসা',
    te: 'AI అడగండి',
    mr: 'AI विचारा',
    ta: 'AI கேளுங்கள்'
  },

  // Hero Section
  'hero.poweredBy': {
    en: 'Powered by AI',
    hi: 'AI द्वारे समर्थित',
    bn: 'AI দ্বারা চালিত',
    te: 'AI ద్వారా మద్దతు',
    mr: 'AI द्वारे समर्थित',
    ta: 'AI மூலம் இயக்கப்படுகிறது'
  },
  'hero.title1': {
    en: 'Your Smart Election',
    hi: 'आपला स्मार्ट निवडणूक',
    bn: 'আপনার স্মার্ট নির্বাচন',
    te: 'మీ స్మార్ట్ ఎన్నిక',
    mr: 'आपला स्मार्ट निवडणूक',
    ta: 'உங்கள் ஸ்மார்ட் தேர்தல்'
  },
  'hero.title2': {
    en: 'Companion',
    hi: 'साथीदार',
    bn: 'সঙ্গী',
    te: 'సహచరి',
    mr: 'साथीदार',
    ta: 'தோழர்'
  },
  'hero.description': {
    en: 'Making voting easy, transparent, and accessible for every Indian citizen with AI-powered guidance and support.',
    hi: 'प्रत्येक भारतीय नागरिकांसाठी मतदान सोपे, पारदर्शक आणि सुलभ करण्यासाठी AI-चालित मार्गदर्शन आणि समर्थन.',
    bn: 'AI-চালিত গাইডেন্স এবং সমর্থনের মাধ্যমে প্রতিটি ভারতীয় নাগরিকের জন্য ভোটিং সহজ, স্বচ্ছ এবং অ্যাক্সেসযোগ্য করা।',
    te: 'AI-ఆధారిత మార్గదర్శకం మరియు మద్దతుతో ప్రతి భారతీయ పౌరుడికి ఓటింగ్‌ను సులభం, పారదర్శకం మరియు అందుబాటులో ఉంచడం.',
    mr: 'प्रत्येक भारतीय नागरिकांसाठी मतदान सोपे, पारदर्शक आणि सुलभ करण्यासाठी AI-चालित मार्गदर्शन आणि समर्थन.',
    ta: 'AI-இயக்கப்பட்ட வழிகாட்டுதல் மற்றும் ஆதரவுடன் ஒவ்வொரு இந்திய குடிமக்களுக்கும் வாக்களிப்பதை எளிதாக்குதல், வெளிப்படையாக்குதல் மற்றும் அணுகக்கூடியதாக்குதல்.'
  },

  // Buttons
  'btn.checkVoterStatus': {
    en: 'Check Voter Status',
    hi: 'मतदार स्थिती तपासा',
    bn: 'ভোটার স্ট্যাটাস চেক করুন',
    te: 'ఓటర్ స్థితిని తనిఖీ చేయండి',
    mr: 'मतदार स्थिती तपासा',
    ta: 'வாக்காளர் நிலையை சரிபார்க்கவும்'
  },
  'btn.findPollingBooth': {
    en: 'Find Polling Booth',
    hi: 'मतदान केंद्र शोधा',
    bn: 'ভোটকেন্দ্র খুঁজুন',
    te: 'ఓటింగ్ బూత్‌ను కనుగొనండి',
    mr: 'मतदान केंद्र शोधा',
    ta: 'வாக்குச் சாவடியைக் கண்டறியவும்'
  },
  'btn.askAIAssistant': {
    en: 'Ask AI Assistant',
    hi: 'AI सहाय्य विचारा',
    bn: 'AI সহায়তা জিজ্ঞাসা করুন',
    te: 'AI సహాయకుడిని అడగండి',
    mr: 'AI सहाय्य विचारा',
    ta: 'AI உதவியைக் கேளுங்கள்'
  },

  // Stats
  'stats.registeredVoters': {
    en: 'Registered Voters',
    hi: 'नोंदणीकृत मतदार',
    bn: 'নিবন্ধিত ভোটার',
    te: 'నమోదైన ఓటర్లు',
    mr: 'नोंदणीकृत मतदार',
    ta: 'பதிவுசெய்யப்பட்ட வாக்காளர்கள்'
  },
  'stats.pollingStations': {
    en: 'Polling Stations',
    hi: 'मतदान केंद्रे',
    bn: 'ভোটকেন্দ্র',
    te: 'ఓటింగ్ కేంద్రాలు',
    mr: 'मतदान केंद्रे',
    ta: 'வாக்குச் சாவடிகள்'
  },
  'stats.states': {
    en: 'States & UTs',
    hi: 'राज्ये आणि केंद्रशासित प्रदेश',
    bn: 'রাজ্য ও কেন্দ্রশাসিত অঞ্চল',
    te: 'రాష్ట్రాలు మరియు కేంద్రపాలిత ప్రాంతాలు',
    mr: 'राज्ये आणि केंद्रशासित प्रदेश',
    ta: 'மாநிலங்கள் மற்றும் ஒன்றிய பிரதேசங்கள்'
  },

  // Features
  'features.everythingYouNeed': {
    en: 'Everything You Need',
    hi: 'आपल्याला जे काही हवे आहे',
    bn: 'আপনার যা প্রয়োজন',
    te: 'మీకు కావాలి అన్నీ',
    mr: 'आपल्याला जे काही हवे आहे',
    ta: 'உங்களுக்குத் தேவையான அனைத்தும்'
  },
  'features.toVoteConfidently': {
    en: 'to Vote Confidently',
    hi: 'आत्मविश्वासाने मतदान करण्यासाठी',
    bn: 'আত্মবিশ্বাসের সাথে ভোট দেওয়ার জন্য',
    te: 'ఖచ్చితంగా ఓటు వేయడానికి',
    mr: 'आत्मविश्वासाने मतदान करण्यासाठी',
    ta: 'தயக்குடன் வாக்களிக்க'
  },
  'features.description': {
    en: 'From voter registration to finding your polling booth, we\'ve got you covered.',
    hi: 'मतदार नोंदणीपासून तुमचे मतदान केंद्र शोधण्यापर्यंत, आपण सर्वांची काळजी घेतो.',
    bn: 'ভোটার নিবন্ধন থেকে আপনার ভোটকেন্দ্র খুঁজে বের করা পর্যন্ত, আমরা আপনাকে কভার করেছি।',
    te: 'ఓటర్ నమోదు నుండి మీ ఓటింగ్ బూత్‌ను కనుగొనడం వరకు, మేము మిమ్మల్ని కవర్ చేసాము.',
    mr: 'मतदार नोंदणीपासून तुमचे मतदान केंद्र शोधण्यापर्यंत, आपण सर्वांची काळजी घेतो.',
    ta: 'வாக்காளர் பதிவிலிருந்து உங்கள் வாக்குச் சாவடியைக் கண்டறிவது வரை, நாங்கள் உங்களைக் கவர் செய்துள்ளோம்.'
  },

  // FAQ
  'faq.title': {
    en: 'Frequently Asked Questions',
    hi: 'अक्सर विचारले जाणारे प्रश्न',
    bn: 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী',
    te: 'తరచుగా అడిగే ప్రశ్నలు',
    mr: 'अक्सर विचारले जाणारे प्रश्न',
    ta: 'அடிக்கடி கேட்கப்படும் கேள்விகள்'
  },
  'faq.subtitle': {
    en: 'Answers to all your questions about voting',
    hi: 'मतदानाबद्दल आपल्या सर्व प्रश्नांची उत्तरे',
    bn: 'ভোটিং সম্পর্কে আপনার সমস্ত প্রশ্নের উত্তর',
    te: 'ఓటింగ్ గురించి మీ అన్ని ప్రశ్నలకు సమాధానాలు',
    mr: 'मतदानाबद्दल आपल्या सर्व प्रश्नांची उत्तरे',
    ta: 'வாக்களிப்பது பற்றிய உங்கள் அனைத்து கேள்விகளுக்கும் பதில்கள்'
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
