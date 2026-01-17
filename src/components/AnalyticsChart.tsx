import { AnalyticsData } from '../types';

interface AnalyticsChartProps {
  data: AnalyticsData[];
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const maxWait = Math.max(...data.map(d => d.averageWaitTime));
  const maxThroughput = Math.max(...data.map(d => d.throughput));

  return (
    <div className="space-y-6">
      {/* Wait Time Chart */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Average Wait Time (minutes)</span>
          <span className="text-sm font-medium text-green-400">↓ {((data[0].averageWaitTime - data[data.length - 1].averageWaitTime) / data[0].averageWaitTime * 100).toFixed(0)}% improvement</span>
        </div>
        <div className="space-y-2">
          {data.map((day, index) => {
            const percentage = (day.averageWaitTime / maxWait) * 100;
            const isImprovement = index > 0 && day.averageWaitTime < data[index - 1].averageWaitTime;
            
            return (
              <div key={day.date} className="flex items-center gap-3">
                <div className="w-16 text-xs text-gray-500">
                  {new Date(day.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1 bg-gray-900 rounded-full h-8 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isImprovement ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-xs font-medium text-white">{day.averageWaitTime}m</span>
                    {isImprovement && <span className="text-xs text-white">✓</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Throughput Chart */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Daily Throughput (patients)</span>
          <span className="text-sm font-medium text-blue-400">↑ {((data[data.length - 1].throughput - data[0].throughput) / data[0].throughput * 100).toFixed(0)}% increase</span>
        </div>
        <div className="space-y-2">
          {data.map((day) => {
            const percentage = (day.throughput / maxThroughput) * 100;
            
            return (
              <div key={day.date} className="flex items-center gap-3">
                <div className="w-16 text-xs text-gray-500">
                  {new Date(day.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1 bg-gray-900 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="absolute inset-0 flex items-center px-3">
                    <span className="text-xs font-medium text-white">{day.throughput}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
