
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Category } from './CategoryBadge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    description: string;
    amount: number;
    date: string;
    category: Category;
  }) => void;
  className?: string;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction, className }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<Category>('other');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories: Category[] = [
    'food', 'shopping', 'transport', 'entertainment',
    'housing', 'utilities', 'health', 'other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || !date) {
      toast.error('Please fill all required fields');
      return;
    }
    
    onAddTransaction({
      description,
      amount: parseFloat(amount),
      date,
      category,
    });
    
    // Reset form
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setCategory('other');
    setIsExpanded(false);
    
    toast.success('Transaction added successfully');
  };

  return (
    <div className={cn("bg-card rounded-xl shadow-sm border border-border/50", className)}>
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-4 flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          <span>Add New Transaction</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 scale-in">
          <h3 className="text-lg font-medium mb-4">New Transaction</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                Description
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="What did you spend on?"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-1">
                  Amount
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
                  Date
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
                Category
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
                    {cat}
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
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default TransactionForm;
