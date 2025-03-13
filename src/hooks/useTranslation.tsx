
import { useSettings } from '@/context/SettingsContext';

type TranslationKey =
  | 'dashboard'
  | 'transactions'
  | 'reports'
  | 'paymentMethods'
  | 'settings'
  | 'theme'
  | 'light'
  | 'dark'
  | 'system'
  | 'language'
  | 'english'
  | 'portuguese'
  | 'description'
  | 'amount'
  | 'category'
  | 'date'
  | 'paymentMethod'
  | 'actions'
  | 'addNewTransaction'
  | 'newTransaction'
  | 'whatDidYouSpendOn'
  | 'cancel'
  | 'addTransaction'
  | 'transactionAdded'
  | 'deleteTransaction'
  | 'confirmDelete'
  | 'deleteWarning'
  | 'delete'
  | 'food'
  | 'shopping'
  | 'transport'
  | 'entertainment'
  | 'housing'
  | 'utilities'
  | 'health'
  | 'other'
  | 'spendingByCategory'
  | 'noData'
  | 'financialDashboard'
  | 'trackSpending'
  | 'totalSpending'
  | 'currentMonth'
  | 'averageDaily'
  | 'last30Days'
  | 'largestExpense'
  | 'thisMonth'
  | 'recentActivity'
  | 'transactionsLabel'
  | 'spendingTrends'
  | 'thisWeek'
  | 'spending'
  | 'fillAllFields'
  | 'noTransactions'
  | 'loadingTransactions'
  | 'search'
  | 'personalizeApp'
  | 'appearance'
  | 'financialSettings'
  | 'monthlySpendingLimit'
  | 'limitDescription'
  | 'save'
  | 'saveSuccess'
  | 'addNewPaymentMethod'
  | 'newPaymentMethod'
  | 'methodName'
  | 'methodType'
  | 'color'
  | 'credit'
  | 'debit'
  | 'cash'
  | 'methodAdded'
  | 'noPaymentMethods'
  | 'confirmDeleteMethod'
  | 'deleteMethodWarning'
  | 'methodDeleted'
  | 'errorDeletingMethod'
  | 'spendingLimitAlert'
  | 'limitExceeded'
  | 'dueMonth'
  | 'currentMonthOption'
  | 'nextMonth'
  | 'noTransactions';

type TranslationsType = Record<TranslationKey, string>;

const enTranslations: TranslationsType = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  reports: 'Reports',
  paymentMethods: 'Payment Methods',
  settings: 'Settings',
  theme: 'Theme',
  light: 'Light',
  dark: 'Dark',
  system: 'System',
  language: 'Language',
  english: 'English',
  portuguese: 'Portuguese',
  description: 'Description',
  amount: 'Amount',
  category: 'Category',
  date: 'Date',
  paymentMethod: 'Payment Method',
  actions: 'Actions',
  addNewTransaction: 'Add New Transaction',
  newTransaction: 'New Transaction',
  whatDidYouSpendOn: 'What did you spend on?',
  cancel: 'Cancel',
  addTransaction: 'Add Transaction',
  transactionAdded: 'Transaction added successfully!',
  deleteTransaction: 'Delete Transaction',
  confirmDelete: 'Confirm Delete',
  deleteWarning: 'Are you sure you want to delete this transaction? This action cannot be undone.',
  delete: 'Delete',
  food: 'Food',
  shopping: 'Shopping',
  transport: 'Transport',
  entertainment: 'Entertainment',
  housing: 'Housing',
  utilities: 'Utilities',
  health: 'Health',
  other: 'Other',
  spendingByCategory: 'Spending by Category',
  noData: 'No data available',
  financialDashboard: 'Financial Dashboard',
  trackSpending: 'Track and manage your expenses',
  totalSpending: 'Total Spending',
  currentMonth: 'Current Month',
  averageDaily: 'Average Daily',
  last30Days: 'Last 30 Days',
  largestExpense: 'Largest Expense',
  thisMonth: 'This Month',
  recentActivity: 'Recent Activity',
  transactionsLabel: 'Transactions',
  spendingTrends: 'Spending Trends',
  thisWeek: 'This Week',
  spending: 'Spending',
  fillAllFields: 'Please fill all required fields',
  noTransactions: 'No transactions found',
  loadingTransactions: 'Loading transactions...',
  search: 'Search',
  personalizeApp: 'Personalize your application',
  appearance: 'Appearance',
  financialSettings: 'Financial Settings',
  monthlySpendingLimit: 'Monthly Spending Limit',
  limitDescription: 'Set a monthly budget limit to track your spending',
  save: 'Save',
  saveSuccess: 'Settings saved successfully!',
  addNewPaymentMethod: 'Add New Payment Method',
  newPaymentMethod: 'New Payment Method',
  methodName: 'Method Name',
  methodType: 'Method Type',
  color: 'Color',
  credit: 'Credit Card',
  debit: 'Debit Card',
  cash: 'Cash',
  methodAdded: 'Payment method added successfully!',
  noPaymentMethods: 'No payment methods found',
  confirmDeleteMethod: 'Confirm Delete',
  deleteMethodWarning: 'Are you sure you want to delete this payment method? This action cannot be undone.',
  methodDeleted: 'Payment method deleted successfully!',
  errorDeletingMethod: 'Error: Cannot delete a payment method that is in use',
  spendingLimitAlert: 'Spending Limit Alert',
  limitExceeded: 'You have exceeded your monthly spending limit of',
  dueMonth: 'Due Month',
  currentMonthOption: 'Current Month',
  nextMonth: 'Next Month',
};

const ptBRTranslations: TranslationsType = {
  dashboard: 'Painel',
  transactions: 'Transações',
  reports: 'Relatórios',
  paymentMethods: 'Formas de Pagamento',
  settings: 'Configurações',
  theme: 'Tema',
  light: 'Claro',
  dark: 'Escuro',
  system: 'Sistema',
  language: 'Idioma',
  english: 'Inglês',
  portuguese: 'Português',
  description: 'Descrição',
  amount: 'Valor',
  category: 'Categoria',
  date: 'Data',
  paymentMethod: 'Forma de Pagamento',
  actions: 'Ações',
  addNewTransaction: 'Adicionar Nova Transação',
  newTransaction: 'Nova Transação',
  whatDidYouSpendOn: 'Com o que você gastou?',
  cancel: 'Cancelar',
  addTransaction: 'Adicionar Transação',
  transactionAdded: 'Transação adicionada com sucesso!',
  deleteTransaction: 'Excluir Transação',
  confirmDelete: 'Confirmar Exclusão',
  deleteWarning: 'Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.',
  delete: 'Excluir',
  food: 'Alimentação',
  shopping: 'Compras',
  transport: 'Transporte',
  entertainment: 'Entretenimento',
  housing: 'Moradia',
  utilities: 'Utilidades',
  health: 'Saúde',
  other: 'Outros',
  spendingByCategory: 'Gastos por Categoria',
  noData: 'Nenhum dado disponível',
  financialDashboard: 'Painel Financeiro',
  trackSpending: 'Acompanhe e gerencie suas despesas',
  totalSpending: 'Gasto Total',
  currentMonth: 'Mês Atual',
  averageDaily: 'Média Diária',
  last30Days: 'Últimos 30 Dias',
  largestExpense: 'Maior Despesa',
  thisMonth: 'Este Mês',
  recentActivity: 'Atividade Recente',
  transactionsLabel: 'Transações',
  spendingTrends: 'Tendências de Gastos',
  thisWeek: 'Esta Semana',
  spending: 'Gastos',
  fillAllFields: 'Por favor preencha todos os campos obrigatórios',
  noTransactions: 'Nenhuma transação encontrada',
  loadingTransactions: 'Carregando transações...',
  search: 'Buscar',
  personalizeApp: 'Personalize sua aplicação',
  appearance: 'Aparência',
  financialSettings: 'Configurações Financeiras',
  monthlySpendingLimit: 'Limite Mensal de Gastos',
  limitDescription: 'Defina um limite de orçamento mensal para acompanhar seus gastos',
  save: 'Salvar',
  saveSuccess: 'Configurações salvas com sucesso!',
  addNewPaymentMethod: 'Adicionar Nova Forma de Pagamento',
  newPaymentMethod: 'Nova Forma de Pagamento',
  methodName: 'Nome do Método',
  methodType: 'Tipo do Método',
  color: 'Cor',
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  cash: 'Dinheiro',
  methodAdded: 'Forma de pagamento adicionada com sucesso!',
  noPaymentMethods: 'Nenhuma forma de pagamento encontrada',
  confirmDeleteMethod: 'Confirmar Exclusão',
  deleteMethodWarning: 'Tem certeza que deseja excluir esta forma de pagamento? Esta ação não pode ser desfeita.',
  methodDeleted: 'Forma de pagamento excluída com sucesso!',
  errorDeletingMethod: 'Erro: Não é possível excluir uma forma de pagamento que está em uso',
  spendingLimitAlert: 'Alerta de Limite de Gastos',
  limitExceeded: 'Você excedeu seu limite mensal de gastos de',
  dueMonth: 'Mês de Vencimento',
  currentMonthOption: 'Mês Atual',
  nextMonth: 'Próximo Mês',
};

export const useTranslation = () => {
  const { settings } = useSettings();
  
  const t = (key: TranslationKey): string => {
    const translations = settings.language === 'pt-BR' ? ptBRTranslations : enTranslations;
    return translations[key] || key;
  };
  
  return { t };
};
