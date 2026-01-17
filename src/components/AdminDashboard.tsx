import { useState } from 'react';
import { BarChart3, TrendingDown, TrendingUp, Settings, Clock, Users, XCircle, Activity, Download } from 'lucide-react';
import { getMockAnalytics, MOCK_SERVICES } from '../utils/mockData';
import { AdvancedAnalytics } from './AdvancedAnalytics';
import { ServiceConfigPanel } from './ServiceConfigPanel';
import { ExportReports } from './ExportReports';

type TabType = 'analytics' | 'config' | 'logs' | 'reports';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('analytics');
  const analytics = getMockAnalytics();
  
  // Calculate improvement metrics
  const firstDay = analytics[0];
  const lastDay = analytics[analytics.length - 1];
  const waitTimeReduction = ((firstDay.averageWaitTime - lastDay.averageWaitTime) / firstDay.averageWaitTime * 100);
  const throughputIncrease = ((lastDay.throughput - firstDay.throughput) / firstDay.throughput * 100);
  const noShowReduction = ((firstDay.noShows - lastDay.noShows) / firstDay.noShows * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-900/40 to-green-900/20 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-sm text-gray-400">Wait Time Reduction</div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {waitTimeReduction.toFixed(1)}%
          </div>
          <div className="text-sm text-green-400">
            From {firstDay.averageWaitTime}m to {lastDay.averageWaitTime}m
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-sm text-gray-400">Throughput Increase</div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {throughputIncrease.toFixed(1)}%
          </div>
          <div className="text-sm text-blue-400">
            {lastDay.throughput} patients/day
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-sm text-gray-400">No-Show Reduction</div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {noShowReduction.toFixed(1)}%
          </div>
          <div className="text-sm text-purple-400">
            Smart reminders working
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-sm text-gray-400">Avg Peak Smoothing</div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            22%
          </div>
          <div className="text-sm text-yellow-400">
            Load redistributed
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-6">
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics & Insights
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'config'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            Service Configuration
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'reports'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Download className="w-4 h-4" />
            Export Reports
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'logs'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            Audit Logs
          </button>
        </div>

        <div className="p-6">
          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <AdvancedAnalytics data={analytics} />
          )}

          {/* Configuration Tab */}
          {activeTab === 'config' && (
            <ServiceConfigPanel services={MOCK_SERVICES} />
          )}

          {/* Export Reports Tab */}
          {activeTab === 'reports' && (
            <ExportReports />
          )}

          {/* Audit Logs Tab */}
          {activeTab === 'logs' && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white mb-4">System Audit Log</h3>
              {[
                { time: '2 mins ago', user: 'Staff: Dr. Kumar', action: 'Completed token A105', type: 'success' },
                { time: '5 mins ago', user: 'Staff: Nurse Priya', action: 'Added walk-in patient to queue', type: 'info' },
                { time: '8 mins ago', user: 'Admin: System', action: 'AI recommendation: Adjust 10 AM capacity', type: 'warning' },
                { time: '12 mins ago', user: 'Citizen: Rahul K.', action: 'Booked appointment for Jan 18', type: 'success' },
                { time: '15 mins ago', user: 'Staff: Dr. Kumar', action: 'Set priority to Emergency for token A104', type: 'warning' },
                { time: '18 mins ago', user: 'Admin: Superintendent', action: 'Updated service configuration', type: 'info' },
                { time: '22 mins ago', user: 'System', action: 'Sent WhatsApp reminder to 15 citizens', type: 'info' },
                { time: '25 mins ago', user: 'Citizen: Priya S.', action: 'Cancelled appointment', type: 'warning' },
              ].map((log, index) => (
                <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-start gap-4">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    log.type === 'success' ? 'bg-green-400' :
                    log.type === 'warning' ? 'bg-yellow-400' :
                    'bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{log.user}</span>
                      <span className="text-xs text-gray-500">{log.time}</span>
                    </div>
                    <div className="text-sm text-gray-400">{log.action}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}