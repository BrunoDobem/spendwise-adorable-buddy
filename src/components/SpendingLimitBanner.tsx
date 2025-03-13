
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface SpendingLimitBannerProps {
  currentSpending: number;
  spendingLimit: number;
  className?: string;
}

const SpendingLimitBanner: React.FC<SpendingLimitBannerProps> = ({
  currentSpending,
  spendingLimit,
  className
}) => {
  const { t } = useTranslation();
  const percentage = (currentSpending / spendingLimit) * 100;
  const isWarning = percentage >= 80 && percentage < 100;
  const isDanger = percentage >= 100;

  let statusColor = 'bg-green-500';
  if (isWarning) statusColor = 'bg-yellow-500';
  if (isDanger) statusColor = 'bg-red-500';

  return (
    <div className={cn(
      "rounded-xl shadow-sm border p-4", 
      isDanger 
        ? "bg-red-500/10 border-red-200 dark:border-red-900" 
        : isWarning 
          ? "bg-yellow-500/10 border-yellow-200 dark:border-yellow-900" 
          : "bg-green-500/10 border-green-200 dark:border-green-900",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          {isDanger && (
            <div className="p-2 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 mr-3">
              <AlertTriangle className="h-5 w-5" />
            </div>
          )}
          <div>
            <h3 className="font-medium">
              {isDanger 
                ? t('spendingLimitExceeded') 
                : isWarning 
                  ? t('approachingSpendingLimit')
                  : t('spendingLimitStatus')
              }
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t('youveSpent')} ${currentSpending.toFixed(2)} {t('ofYour')} ${spendingLimit.toFixed(2)} {t('limit')}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">
            {percentage.toFixed(0)}%
          </div>
        </div>
      </div>

      <div className="mt-3 bg-background/50 rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-full rounded-full ${statusColor}`} 
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SpendingLimitBanner;
