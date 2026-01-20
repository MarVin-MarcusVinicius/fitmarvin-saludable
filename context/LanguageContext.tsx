import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ES';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const dictionary: Record<string, Record<Language, string>> = {
    // Sidebar
    'nav.home': { ES: 'Inicio' },
    'nav.exercises': { ES: 'Ejercicios' },
    'nav.nutrition': { ES: 'Nutrición' },
    'nav.community': { ES: 'Comunidad' },

    'nav.system': { ES: 'Sistema' },
    'nav.profile': { ES: 'Perfil' },
    'nav.panel': { ES: 'Panel Elite' },

    // Header
    'header.search': { ES: 'Buscar rutinas, comidas...' },
    'header.config': { ES: 'Configurar Plan' },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('ES');

    const t = (key: string): string => {
        if (!dictionary[key]) return key;
        return dictionary[key][language];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};