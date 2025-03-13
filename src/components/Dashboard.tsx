import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Wallet, ArrowDown, Clock, CreditCard, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import StatCard from './StatCard';
import ExpenseSummary from './ExpenseSummary';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import { useTransactions } from '@/context/TransactionsContext';
import { useSettings } from '@/context/SettingsContext';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { transactions, paymentMethods } = useTransactions();
  const { settings } = useSettings();
  
  const generateChartData = () => {
    const days = 7;
    const today = new Date();
    const dailyData: { [key: string]: number } = {};
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(today.getDate() - (days - 1) + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      dailyData[dayName] = 0;
    }
    
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      if ((today.getTime() - transactionDate.getTime()) / (1000 * 3600 * 24) < days) {
        const dayName = transactionDate.toLocaleDateString('en-US', { weekday: 'short' });
        dailyData[dayName] = (dailyData[dayName] || 0) + transaction.amount;
      }
    });
    
    return Object.keys(dailyData).map(key => ({
      name: key,
      spending: dailyData[key]
    }));
  };
  
  const chartData = generateChartData();
  
  const getCurrentMonthTransactions = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      
      if (transaction.dueMonth) {
        const [dueYear, dueMonth] = transaction.dueMonth.split('-').map(Number);
        return dueYear === currentYear && dueMonth - 1 === currentMonth;
      }
      
      return transactionDate.getFullYear() === currentYear && 
             transactionDate.getMonth() === currentMonth;
    });
  };
  
  const currentMonthTransactions = getCurrentMonthTransactions();
  const totalSpending = currentMonthTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const isSpendingLimitExceeded = totalSpending > settings.spendingLimit;
  
  useEffect(() => {
    if (isSpendingLimitExceeded) {
      toast.warning(
        `${t('spendingLimitAlert')}: ${t('limitExceeded')} $${settings.spendingLimit.toFixed(2)}`,
        {
          duration: 5000,
          icon: <AlertTriangle className="text-yellow-500" />
        }
      );
    }
  }, [isSpendingLimitExceeded, settings.spendingLimit, t]);
  
  const spendingByCategory = currentMonthTransactions.reduce((acc, transaction) => {
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
  }, [] as { category: string; amount: number }[]);
  
  const largestExpense = transactions.length > 0 ? 
    Math.max(...transactions.map(t => t.amount)) : 0;
  
  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{t('financialDashboard')}</h1>
        <p className="text-muted-foreground">{t('trackSpending')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title={t('totalSpending')}
          value={`$${totalSpending.toFixed(2)}`}
          description={t('currentMonth')}
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 12, isPositive: false }}
          delay={0}
          alert={isSpendingLimitExceeded}
        />
        
        <StatCard
          title={t('averageDaily')}
          value={`$${(totalSpending / 30).toFixed(2)}`}
          description={t('last30Days')}
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: 3, isPositive: true }}
          delay={1}
        />
        
        <StatCard
          title={t('largestExpense')}
          value={`$${largestExpense.toFixed(2)}`}
          description={t('thisMonth')}
          icon={<ArrowDown className="h-5 w-5" />}
          delay={2}
        />
        
        <StatCard
          title={t('recentActivity')}
          value={`${transactions.length} ${t('transactionsLabel')}`}
          description={t('last30Days')}
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
            <h3 className="text-lg font-medium">{t('spendingTrends')}</h3>
            <div className="flex space-x-2">
              <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {t('thisWeek')}
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
                  formatter={(value) => [`$${value}`, t('spending')]}
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
          <TransactionForm />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <TransactionList />
        </div>
        
        <div className="slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <ExpenseSummary data={spendingByCategory} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
