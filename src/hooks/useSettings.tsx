
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import type { Language } from './useTranslation';

// Tipo de tema
export type Theme = 'light' | 'dark' | 'system';

// Interface de configurações
export interface Settings {
  theme: Theme;
  language: Language;
  spendingLimit: number;
  enableSpendingLimit: boolean;
}

// Configurações padrão
const defaultSettings: Settings = {
  theme: 'system',
  language: 'en',
  spendingLimit: 0,
  enableSpendingLimit: false
};

// Tipo do contexto de configurações
interface SettingsContextType {
  settings: Settings;
  saveSettings: (newSettings: Partial<Settings>) => void;
}

// Criando o contexto
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Provedor de configurações
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  // Carrega as configurações do localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('expense-tracker-settings');
    
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({
          ...prev,
          ...parsedSettings
        }));
      } catch (error) {
        console.error('Failed to parse settings:', error);
      }
    }
    
    setLoaded(true);
  }, []);

  // Aplica o tema quando ele muda
  useEffect(() => {
    if (!loaded) return;
    
    // Salva as configurações no localStorage
    localStorage.setItem('expense-tracker-settings', JSON.stringify(settings));
    
    // Aplica o tema
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (settings.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(settings.theme);
    }
  }, [settings, loaded]);

  // Função para salvar novas configurações
  const saveSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
    
    toast.success('Settings saved successfully');
  };

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook personalizado para usar configurações
export const useSettings = () => {
  const context = useContext(SettingsContext);
  
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  
  return context;
};
