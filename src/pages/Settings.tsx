
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Settings as SettingsIcon, Moon, Sun, Monitor, Globe, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings, Theme } from '@/hooks/useSettings';
import { useTranslation, Language } from '@/hooks/useTranslation';

const Settings = () => {
  const { settings, saveSettings } = useSettings();
  const { t } = useTranslation();
  
  const [theme, setTheme] = useState<Theme>(settings.theme);
  const [language, setLanguage] = useState<Language>(settings.language);
  const [enableSpendingLimit, setEnableSpendingLimit] = useState(settings.enableSpendingLimit);
  const [spendingLimit, setSpendingLimit] = useState(settings.spendingLimit.toString());
  
  const handleSave = () => {
    saveSettings({
      theme,
      language,
      enableSpendingLimit,
      spendingLimit: enableSpendingLimit ? parseFloat(spendingLimit) || 0 : 0
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 mt-16">
        <div className="mb-6 page-transition fade-in">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-primary/10 text-primary mr-3">
              <SettingsIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">{t('settings')}</h1>
              <p className="text-muted-foreground">{t('personalizeYourExperience')}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl shadow-sm border border-border/50 p-6 slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-medium mb-4 flex items-center">
              <Sun className="w-5 h-5 mr-2" />
              {t('appearance')}
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t('theme')}</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-lg border transition-all",
                      theme === 'light' 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border hover:border-input"
                    )}
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="w-5 h-5 mb-2" />
                    <span>{t('light')}</span>
                  </button>
                  
                  <button
                    type="button"
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-lg border transition-all",
                      theme === 'dark' 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border hover:border-input"
                    )}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="w-5 h-5 mb-2" />
                    <span>{t('dark')}</span>
                  </button>
                  
                  <button
                    type="button"
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-lg border transition-all",
                      theme === 'system' 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border hover:border-input"
                    )}
                    onClick={() => setTheme('system')}
                  >
                    <Monitor className="w-5 h-5 mb-2" />
                    <span>{t('system')}</span>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">{t('language')}</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={cn(
                      "flex items-center justify-center p-3 rounded-lg border transition-all",
                      language === 'en' 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border hover:border-input"
                    )}
                    onClick={() => setLanguage('en')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    <span>{t('english')}</span>
                  </button>
                  
                  <button
                    type="button"
                    className={cn(
                      "flex items-center justify-center p-3 rounded-lg border transition-all",
                      language === 'pt-BR' 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border hover:border-input"
                    )}
                    onClick={() => setLanguage('pt-BR')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    <span>{t('portuguese')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl shadow-sm border border-border/50 p-6 slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-medium mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              {t('spendingLimits')}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label htmlFor="enableSpendingLimit" className="text-sm font-medium">
                  {t('enableSpendingLimit')}
                </label>
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    id="enableSpendingLimit"
                    checked={enableSpendingLimit}
                    onChange={(e) => setEnableSpendingLimit(e.target.checked)}
                    className="sr-only"
                  />
                  <div 
                    className={cn(
                      "w-11 h-6 rounded-full transition-colors",
                      enableSpendingLimit ? "bg-primary" : "bg-muted"
                    )}
                    onClick={() => setEnableSpendingLimit(!enableSpendingLimit)}
                  >
                    <div 
                      className={cn(
                        "w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform",
                        enableSpendingLimit ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </div>
                </div>
              </div>
              
              {enableSpendingLimit && (
                <div>
                  <label htmlFor="spendingLimit" className="block text-sm font-medium mb-2">
                    {t('monthlySpendingLimit')}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <input
                      id="spendingLimit"
                      type="number"
                      value={spendingLimit}
                      onChange={(e) => setSpendingLimit(e.target.value)}
                      min="0"
                      step="50"
                      className="w-full pl-7 pr-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="1000"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
