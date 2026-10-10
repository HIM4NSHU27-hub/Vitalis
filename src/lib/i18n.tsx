import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi' | 'mr';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
}

export const translations: Translations = {
  appName: { en: "Vitalis", hi: "वाइटैलिस", mr: "व्हाइटॅलिस" },
  disclaimer: {
    en: "Educational use only. This is not a diagnosis. Please talk to your doctor.",
    hi: "केवल शैक्षणिक उपयोग हेतु। यह चिकित्सकीय निदान नहीं है। कृपया डॉक्टर से सलाह लें।",
    mr: "केवळ शैक्षणिक वापरासाठी. हे वैद्यकीय निदान नाही. कृपया डॉक्टरांशी संपर्क साधा."
  },
  navHome: { en: "Home", hi: "होम", mr: "मुख्यपृष्ठ" },
  navDemo: { en: "Live Demo", hi: "लाइव डेमो", mr: "थेट डेमो" },
  navDashboard: { en: "Dashboard", hi: "डैशबोर्ड", mr: "डॅशबोर्ड" },
  navHistory: { en: "History", hi: "इतिहास", mr: "इतिहास" },
  navSettings: { en: "Settings", hi: "सेटिंग्स", mr: "सेटिंग्ज" },
  login: { en: "Log In", hi: "लॉग इन", mr: "लॉगिन" },
  signup: { en: "Get Started", hi: "शुरू करें", mr: "सुरुवात करा" },
  logout: { en: "Log Out", hi: "लॉग आउट", mr: "लॉग आउट" },
};

interface I18nContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('vitalis_lang') as Language) || 'en';
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('vitalis_lang', l);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][lang]) {
      return translations[key][lang];
    }
    return key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);