
import React, { useState } from 'react';
import { PlusCircle, CreditCard, HelpCircle } from 'lucide-react';
import { Category } from './CategoryBadge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

export type PaymentMethod = 'cash' | 'debit' | 'credit' | 'pix' | 'transfer' | string;

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    description: string;
    amount: number;
    date: string;
    category: Category;
    paymentMethod: PaymentMethod;
    isNextMonth: boolean;
  }) => void;
  className?: string;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction, className }) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<Category>('other');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [isNextMonth, setIsNextMonth] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const categories: Category[] = [
    'food', 'shopping', 'transport', 'entertainment',
    'housing', 'utilities', 'health', 'other'
  ];

  const paymentMethods: PaymentMethod[] = [
    'cash', 'debit', 'credit', 'pix', 'transfer'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || !date) {
      toast.error(t('fillAllFields'));
      return;
    }
    
    onAddTransaction({
      description,
      amount: parseFloat(amount),
      date,
      category,
      paymentMethod,
      isNextMonth: paymentMethod === 'credit' ? isNextMonth : false
    });
    
    // Reset form
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setCategory('other');
    setPaymentMethod('cash');
    setIsNextMonth(false);
    setIsExpanded(false);
    
    toast.success(t('transactionAdded'));
  };

  return (
    <div className={cn("bg-card rounded-xl shadow-sm border border-border/50", className)}>
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-4 flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          <span>{t('addNewTransaction')}</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 scale-in">
          <h3 className="text-lg font-medium mb-4">{t('newTransaction')}</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                {t('description')}
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder={t('whatDidYouSpendOn')}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-1">
                  {t('amount')}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">
                  {t('date')}
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t('paymentMethod')}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={cn(
                      `p-2 rounded-lg text-center text-xs capitalize transition-all flex flex-col items-center justify-center`,
                      paymentMethod === method 
                        ? 'ring-2 ring-ring bg-primary/10' 
                        : 'opacity-70 hover:opacity-100 bg-muted/50'
                    )}
                  >
                    <CreditCard className="w-4 h-4 mb-1" />
                    {t(method)}
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === 'credit' && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isNextMonth"
                  checked={isNextMonth}
                  onChange={(e) => setIsNextMonth(e.target.checked)}
                  className="rounded border-input bg-background"
                />
                <label htmlFor="isNextMonth" className="text-sm text-muted-foreground flex items-center">
                  {t('billNextMonth')}
                  <HelpCircle className="ml-1 w-3 h-3 text-muted-foreground" />
                </label>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t('category')}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={cn(
                      `category-${cat} p-2 rounded-lg text-center text-xs capitalize transition-all`,
                      category === cat ? 'ring-2 ring-ring' : 'opacity-70 hover:opacity-100'
                    )}
                  >
                    {t(cat)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {t('addTransaction')}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default TransactionForm;
