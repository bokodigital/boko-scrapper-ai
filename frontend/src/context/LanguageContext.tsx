import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the context type
type LanguageContextType = {
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
};

// Create context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'es', // Default to Spanish
  setLanguage: () => {}, // Empty function placeholder
});

// Provider component that will wrap the app
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  // Update the HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // The provider component provides the language state and setter function
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext; 