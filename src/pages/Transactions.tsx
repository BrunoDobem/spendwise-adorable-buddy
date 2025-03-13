
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TransactionList, { Transaction } from '@/components/TransactionList';
import TransactionForm from '@/components/TransactionForm';
import { Category } from '@/components/CategoryBadge';
import { Wallet } from 'lucide-react';

// Sample data generator (same as in Dashboard)
const generateSampleTransactions = (): Transaction[] => {
  const categories: Category[] = ['food', 'shopping', 'transport', 'entertainment', 'housing', 'utilities', 'health', 'other'];
  const descriptions = [
    'Grocery shopping', 'Monthly rent', 'Uber ride', 'Movie tickets', 
    'Electricity bill', 'New shoes', 'Dinner with friends', 'Doctor visit',
    'Phone bill', 'Gym membership', 'Office supplies', 'Coffee'
  ];
  
  return Array.from({ length: 20 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      id: `tr-${i}`,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      amount: parseFloat((Math.random() * 200 + 10).toFixed(2)),
      date: date.toISOString().split('T')[0],
      category: categories[Math.floor(Math.random() * categories.length)]
    };
  });
};

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data from a database
    setTimeout(() => {
      setTransactions(generateSampleTransactions());
      setLoading(false);
    }, 800);
  }, []);
  
  const handleAddTransaction = (transaction: {
    description: string;
    amount: number;
    date: string;
    category: Category;
  }) => {
    const newTransaction: Transaction = {
      id: `tr-${Date.now()}`,
      ...transaction
    };
    
    setTransactions([newTransaction, ...transactions]);
  };
  
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your transactions...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 mt-16">
        <div className="mb-6 page-transition fade-in">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-primary/10 text-primary mr-3">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">Transactions</h1>
              <p className="text-muted-foreground">Manage and track your spending</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <TransactionList transactions={transactions} />
          </div>
          
          <div className="slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <TransactionForm 
              onAddTransaction={handleAddTransaction} 
              className="sticky top-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
