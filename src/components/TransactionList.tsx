
import React, { useState } from 'react';
import CategoryBadge, { Category } from './CategoryBadge';
import { ChevronDown, ChevronUp, Search, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaymentMethod } from './TransactionForm';
import { toast } from 'sonner';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: Category;
  paymentMethod?: PaymentMethod;
  isNextMonth?: boolean;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction?: (id: string) => void;
  className?: string;
}

export const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onDeleteTransaction,
  className 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (column: 'date' | 'amount') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };
  
  const filteredTransactions = transactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (transaction.paymentMethod && 
     transaction.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const handleDelete = (id: string) => {
    if (onDeleteTransaction) {
      onDeleteTransaction(id);
      toast.success('Transação excluída com sucesso');
    }
  };
  
  return (
    <div className={cn("bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden", className)}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Recent Transactions</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-lg text-sm border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        
        <div className="overflow-hidden">
          {sortedTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-muted rounded-lg text-xs font-medium text-muted-foreground mb-2">
                <div className="col-span-4">Description</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Payment</div>
                <div 
                  className="col-span-2 flex items-center cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  Date
                  {sortBy === 'date' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="w-3 h-3 ml-1" /> : 
                      <ChevronDown className="w-3 h-3 ml-1" />
                  )}
                </div>
                <div 
                  className="col-span-1 text-right flex items-center justify-end cursor-pointer"
                  onClick={() => handleSort('amount')}
                >
                  Amount
                  {sortBy === 'amount' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="w-3 h-3 ml-1" /> : 
                      <ChevronDown className="w-3 h-3 ml-1" />
                  )}
                </div>
                <div className="col-span-1"></div>
              </div>
              
              <div className="space-y-2">
                {sortedTransactions.map((transaction, index) => (
                  <div 
                    key={transaction.id} 
                    className="grid grid-cols-12 gap-2 px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors"
                    style={{ 
                      animationDelay: `${index * 0.05}s`, 
                      animationFillMode: 'backwards' 
                    }}
                  >
                    <div className="col-span-4 font-medium truncate">
                      {transaction.description}
                      {transaction.isNextMonth && (
                        <span className="ml-2 text-xs px-1.5 py-0.5 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded">
                          Next Month
                        </span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <CategoryBadge category={transaction.category} />
                    </div>
                    <div className="col-span-2 text-sm text-muted-foreground">
                      {transaction.paymentMethod || "—"}
                    </div>
                    <div className="col-span-2 text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                    </div>
                    <div className="col-span-1 text-right font-medium">
                      ${transaction.amount.toFixed(2)}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      {onDeleteTransaction && (
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Delete transaction"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
