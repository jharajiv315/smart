import { TrendingUp, TrendingDown, Users, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

export function StatsCard({ title, value, change, trend, icon, color }: StatsCardProps) {
  const colorClasses = {
    blue: 'from-blue-900/40 to-blue-900/20 border-blue-500/30',
    green: 'from-green-900/40 to-green-900/20 border-green-500/30',
    yellow: 'from-yellow-900/40 to-yellow-900/20 border-yellow-500/30',
    red: 'from-red-900/40 to-red-900/20 border-red-500/30',
    purple: 'from-purple-900/40 to-purple-900/20 border-purple-500/30',
  };

  const iconBgClasses = {
    blue: 'bg-blue-500/20',
    green: 'bg-green-500/20',
    yellow: 'bg-yellow-500/20',
    red: 'bg-red-500/20',
    purple: 'bg-purple-500/20',
  };

  const iconColorClasses = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    red: 'text-red-400',
    purple: 'text-purple-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 ${iconBgClasses[color]} rounded-lg flex items-center justify-center`}>
          <div className={iconColorClasses[color]}>{icon}</div>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
      {change && (
        <div className={`text-xs mt-2 ${trend === 'up' ? 'text-green-400' : 'text-blue-400'}`}>
          {change}
        </div>
      )}
    </div>
  );
}

interface RealtimeStatsProps {
  stats: {
    total: number;
    waiting: number;
    inProgress: number;
    completed: number;
    avgWait: number;
    todayTotal: number;
    efficiency: number;
  };
}

export function RealtimeStats({ stats }: RealtimeStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      <StatsCard
        title="Total in Queue"
        value={stats.total}
        icon={<Users className="w-6 h-6" />}
        color="blue"
        change={`${stats.todayTotal} today`}
      />
      
      <StatsCard
        title="Waiting"
        value={stats.waiting}
        icon={<Clock className="w-6 h-6" />}
        color="yellow"
        trend="down"
        change="-2 from peak"
      />
      
      <StatsCard
        title="In Progress"
        value={stats.inProgress}
        icon={<Users className="w-6 h-6" />}
        color="purple"
      />
      
      <StatsCard
        title="Completed"
        value={stats.completed}
        icon={<CheckCircle2 className="w-6 h-6" />}
        color="green"
        trend="up"
        change="+12 this hour"
      />
      
      <StatsCard
        title="Avg Wait"
        value={`${stats.avgWait}m`}
        icon={<Clock className="w-6 h-6" />}
        color="blue"
        change="Below target"
      />
      
      <StatsCard
        title="Efficiency"
        value={`${stats.efficiency}%`}
        icon={<TrendingUp className="w-6 h-6" />}
        color="green"
        trend="up"
        change="Optimal"
      />
      
      <StatsCard
        title="No-Shows"
        value="2"
        icon={<XCircle className="w-6 h-6" />}
        color="red"
        change="Low rate"
      />
    </div>
  );
}
