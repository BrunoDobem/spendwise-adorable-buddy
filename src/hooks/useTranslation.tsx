
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSettings } from './useSettings';

// Definindo os idiomas disponíveis
export type Language = 'en' | 'pt-BR';

// Importações do tipo das traduções
interface Translations {
  [key: string]: string;
}

// Traduções em português
const ptBR: Translations = {
  // Dashboard e estatísticas
  financialDashboard: 'Painel Financeiro',
  trackYourSpending: 'Acompanhe seus gastos e gerencie suas finanças',
  totalSpending: 'Gasto Total',
  currentMonth: 'Mês atual',
  averageDaily: 'Média Diária',
  last30Days: 'Últimos 30 dias',
  largestExpense: 'Maior Despesa',
  thisMonth: 'Este mês',
  recentActivity: 'Atividade Recente',
  transactionsLabel: 'transações', // Renamed to avoid duplicate
  spendingTrends: 'Tendências de Gastos',
  thisWeek: 'Esta semana',
  spending: 'Gastos',
  
  // Transações
  transactions: 'Transações',
  manageAndTrack: 'Gerencie e acompanhe seus gastos',
  addNewTransaction: 'Adicionar Nova Transação',
  newTransaction: 'Nova Transação',
  description: 'Descrição',
  whatDidYouSpendOn: 'Em que você gastou?',
  amount: 'Valor',
  date: 'Data',
  category: 'Categoria',
  cancel: 'Cancelar',
  addTransaction: 'Adicionar Transação',
  fillAllFields: 'Por favor, preencha todos os campos obrigatórios',
  transactionAdded: 'Transação adicionada com sucesso',
  
  // Categorias
  food: 'Alimentação',
  shopping: 'Compras',
  transport: 'Transporte',
  entertainment: 'Entretenimento',
  housing: 'Moradia',
  utilities: 'Serviços',
  health: 'Saúde',
  other: 'Outros',
  
  // Formas de pagamento
  paymentMethod: 'Forma de Pagamento',
  cash: 'Dinheiro',
  credit: 'Crédito',
  debit: 'Débito',
  pix: 'Pix',
  transfer: 'Transferência',
  billNextMonth: 'Lançar na fatura do próximo mês',
  
  // Relatórios
  financialReports: 'Relatórios Financeiros',
  analyzeYourSpending: 'Analise seus padrões de gastos',
  monthlyOverview: 'Visão Mensal',
  spendingTrendsReport: 'Tendências de Gastos', // Renamed to avoid duplicate
  categoryBreakdown: 'Divisão por Categoria',
  month: 'Mês',
  months: 'Meses',
  year: 'Ano',
  expenses: 'Despesas',
  percentage: 'Porcentagem',
  spendingSummary: 'Resumo de Gastos',
  averageMonthly: 'Média Mensal',
  highestMonth: 'Mês Mais Alto',
  lowestMonth: 'Mês Mais Baixo',
  yearToDate: 'Acumulado do Ano',
  topSpendingCategories: 'Categorias de Maior Gasto',

  // Configurações
  settings: 'Configurações',
  personalizeYourExperience: 'Personalize sua experiência',
  appearance: 'Aparência',
  theme: 'Tema',
  light: 'Claro',
  dark: 'Escuro',
  system: 'Sistema',
  language: 'Idioma',
  english: 'English',
  portuguese: 'Português (BR)',
  spendingLimits: 'Limites de Gastos',
  monthlySpendingLimit: 'Limite Mensal de Gastos',
  enableSpendingLimit: 'Ativar Limite de Gastos',
  setLimit: 'Definir Limite',
  save: 'Salvar',
  settingsSaved: 'Configurações salvas com sucesso',
  
  // Alerta de limite de gastos
  spendingLimitStatus: 'Status do Limite de Gastos',
  approachingSpendingLimit: 'Aproximando-se do Limite de Gastos',
  spendingLimitExceeded: 'Limite de Gastos Excedido',
  youveSpent: 'Você gastou',
  ofYour: 'do seu',
  limit: 'limite',
  
  // Carregando
  loadingFinancialData: 'Carregando seus dados financeiros...',
  loadingTransactions: 'Carregando suas transações...',
};

// Traduções em inglês
const en: Translations = {
  // Dashboard e estatísticas
  financialDashboard: 'Financial Dashboard',
  trackYourSpending: 'Track your spending and manage your finances',
  totalSpending: 'Total Spending',
  currentMonth: 'Current month',
  averageDaily: 'Average Daily',
  last30Days: 'Last 30 days',
  largestExpense: 'Largest Expense',
  thisMonth: 'This month',
  recentActivity: 'Recent Activity',
  transactionsLabel: 'transactions', // Renamed to avoid duplicate
  spendingTrends: 'Spending Trends',
  thisWeek: 'This Week',
  spending: 'Spending',
  
  // Transações
  transactions: 'Transactions',
  manageAndTrack: 'Manage and track your spending',
  addNewTransaction: 'Add New Transaction',
  newTransaction: 'New Transaction',
  description: 'Description',
  whatDidYouSpendOn: 'What did you spend on?',
  amount: 'Amount',
  date: 'Date',
  category: 'Category',
  cancel: 'Cancel',
  addTransaction: 'Add Transaction',
  fillAllFields: 'Please fill all required fields',
  transactionAdded: 'Transaction added successfully',
  
  // Categorias
  food: 'Food',
  shopping: 'Shopping',
  transport: 'Transport',
  entertainment: 'Entertainment',
  housing: 'Housing',
  utilities: 'Utilities',
  health: 'Health',
  other: 'Other',
  
  // Formas de pagamento
  paymentMethod: 'Payment Method',
  cash: 'Cash',
  credit: 'Credit',
  debit: 'Debit',
  pix: 'Pix',
  transfer: 'Transfer',
  billNextMonth: 'Bill next month',
  
  // Relatórios
  financialReports: 'Financial Reports',
  analyzeYourSpending: 'Analyze your spending patterns',
  monthlyOverview: 'Monthly Overview',
  spendingTrendsReport: 'Spending Trends', // Renamed to avoid duplicate
  categoryBreakdown: 'Category Breakdown',
  month: 'Month',
  months: 'Months',
  year: 'Year',
  expenses: 'Expenses',
  percentage: 'Percentage',
  spendingSummary: 'Spending Summary',
  averageMonthly: 'Average Monthly',
  highestMonth: 'Highest Month',
  lowestMonth: 'Lowest Month',
  yearToDate: 'Year-to-Date',
  topSpendingCategories: 'Top Spending Categories',

  // Configurações
  settings: 'Settings',
  personalizeYourExperience: 'Personalize your experience',
  appearance: 'Appearance',
  theme: 'Theme',
  light: 'Light',
  dark: 'Dark',
  system: 'System',
  language: 'Language',
  english: 'English',
  portuguese: 'Português (BR)',
  spendingLimits: 'Spending Limits',
  monthlySpendingLimit: 'Monthly Spending Limit',
  enableSpendingLimit: 'Enable Spending Limit',
  setLimit: 'Set Limit',
  save: 'Save',
  settingsSaved: 'Settings saved successfully',
  
  // Alerta de limite de gastos
  spendingLimitStatus: 'Spending Limit Status',
  approachingSpendingLimit: 'Approaching Spending Limit',
  spendingLimitExceeded: 'Spending Limit Exceeded',
  youveSpent: 'You\'ve spent',
  ofYour: 'of your',
  limit: 'limit',
  
  // Carregando
  loadingFinancialData: 'Loading your financial data...',
  loadingTransactions: 'Loading your transactions...',
};

// Mapeamento de idiomas para traduções
const translations: Record<Language, Translations> = {
  'en': en,
  'pt-BR': ptBR
};

// Tipo do contexto de traduções
interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Criando o contexto
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Provedor de traduções
export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { settings } = useSettings();
  const [language, setLanguage] = useState<Language>(settings.language || 'en');

  // Atualiza o idioma quando a configuração mudar
  useEffect(() => {
    if (settings.language) {
      setLanguage(settings.language);
    }
  }, [settings.language]);

  // Função para traduzir uma chave
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook personalizado para usar traduções
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  return context;
};
