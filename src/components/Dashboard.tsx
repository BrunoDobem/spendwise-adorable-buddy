
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Wallet, ArrowDown, Clock, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import StatCard from './StatCard';
import ExpenseSummary from './ExpenseSummary';
import TransactionList, { Transaction } from './TransactionList';
import TransactionForm from './TransactionForm';
import { Category } from './CategoryBadge';

// Sample data for demo purposes
const generateSampleTransactions = (): Transaction[] => {
  const categories: Category[] = ['food', 'shopping', 'transport', 'entertainment', 'housing', 'utilities', 'health', 'other'];
  const descriptions = [
    'Grocery shopping', 'Monthly rent', 'Uber ride', 'Movie tickets', 
    'Electricity bill', 'New shoes', 'Dinner with friends', 'Doctor visit',
    'Phone bill', 'Gym membership', 'Office supplies', 'Coffee'
  ];
  
  return Array.from({ length: 12 }).map((_, i) => {
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

const generateSampleChartData = () => {
  const today = new Date();
  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - 6 + i);
    const spending = Math.floor(Math.random() * 150 + 50);
    
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      spending
    };
  });
};

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data from a database
    setTimeout(() => {
      setTransactions(generateSampleTransactions());
      setChartData(generateSampleChartData());
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
  
  const totalSpending = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const spendingByCategory = transactions.reduce((acc, transaction) => {
    const existingCategory = acc.find(item => item.category === transaction.category);
    
    if (existingCategory) {
      existingCategory.amount += transaction.amount;
    } else {
      acc.push({
        category: transaction.category,
        amount: transaction.amount
      });
    }
    
    return acc;
  }, [] as { category: Category; amount: number }[]);
  
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your financial data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Financial Dashboard</h1>
        <p className="text-muted-foreground">Track your spending and manage your finances</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Spending"
          value={`$${totalSpending.toFixed(2)}`}
          description="Current month"
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 12, isPositive: false }}
          delay={0}
        />
        
        <StatCard
          title="Average Daily"
          value={`$${(totalSpending / 30).toFixed(2)}`}
          description="Last 30 days"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: 3, isPositive: true }}
          delay={1}
        />
        
        <StatCard
          title="Largest Expense"
          value={`$${Math.max(...transactions.map(t => t.amount), 0).toFixed(2)}`}
          description="This month"
          icon={<ArrowDown className="h-5 w-5" />}
          delay={2}
        />
        
        <StatCard
          title="Recent Activity"
          value={`${transactions.length} transactions`}
          description="Last 30 days"
          icon={<Clock className="h-5 w-5" />}
          delay={3}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className={cn(
          "lg:col-span-2 bg-card rounded-xl shadow-sm border border-border/50 p-4",
          "slide-up"
        )} style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Spending Trends</h3>
            <div className="flex space-x-2">
              <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                This Week
              </div>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tickLine={false} />
                <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Spending']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid hsl(var(--border))',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="spending"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <TransactionForm onAddTransaction={handleAddTransaction} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <TransactionList transactions={transactions} />
        </div>
        
        <div className="slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <ExpenseSummary data={spendingByCategory} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
