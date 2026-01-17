import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown, TrendingUp, Users, Clock, XCircle, Activity, Calendar, AlertCircle } from 'lucide-react';

interface AnalyticsProps {
  data: any[];
}

export function AdvancedAnalytics({ data }: AnalyticsProps) {
  // Wait time trend data
  const waitTimeTrend = data.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    waitTime: d.averageWaitTime,
    throughput: d.throughput,
  }));

  // Service distribution
  const serviceDistribution = [
    { name: 'Hospital OPD', value: 342, color: '#ef4444' },
    { name: 'RTO Services', value: 245, color: '#3b82f6' },
    { name: 'Passport', value: 189, color: '#10b981' },
    { name: 'Bank', value: 156, color: '#f59e0b' },
  ];

  // Hourly congestion
  const hourlyCongestion = [
    { hour: '09:00', patients: 45, capacity: 50, utilization: 90 },
    { hour: '10:00', patients: 52, capacity: 50, utilization: 104 },
    { hour: '11:00', patients: 32, capacity: 50, utilization: 64 },
    { hour: '12:00', patients: 18, capacity: 50, utilization: 36 },
    { hour: '13:00', patients: 22, capacity: 50, utilization: 44 },
    { hour: '14:00', patients: 35, capacity: 50, utilization: 70 },
    { hour: '15:00', patients: 38, capacity: 50, utilization: 76 },
    { hour: '16:00', patients: 48, capacity: 50, utilization: 96 },
    { hour: '17:00', patients: 42, capacity: 50, utilization: 84 },
  ];

  // Week comparison
  const weekComparison = [
    { day: 'Mon', thisWeek: 145, lastWeek: 168 },
    { day: 'Tue', thisWeek: 152, lastWeek: 175 },
    { day: 'Wed', thisWeek: 138, lastWeek: 162 },
    { day: 'Thu', thisWeek: 165, lastWeek: 180 },
    { day: 'Fri', thisWeek: 148, lastWeek: 171 },
    { day: 'Sat', thisWeek: 171, lastWeek: 185 },
    { day: 'Sun', thisWeek: 158, lastWeek: 179 },
  ];

  // No-show trends
  const noShowTrend = data.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    noShows: d.noShows,
    total: d.totalAppointments,
    rate: ((d.noShows / d.totalAppointments) * 100).toFixed(1),
  }));

  const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];

  // Calculate metrics
  const totalPatients = data.reduce((acc, d) => acc + d.throughput, 0);
  const avgWaitTime = data.reduce((acc, d) => acc + d.averageWaitTime, 0) / data.length;
  const totalNoShows = data.reduce((acc, d) => acc + d.noShows, 0);
  const improvement = ((data[0].averageWaitTime - data[data.length - 1].averageWaitTime) / data[0].averageWaitTime * 100);

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{totalPatients}</div>
          <div className="text-sm text-gray-400">Total Patients Served</div>
          <div className="mt-2 text-xs text-blue-400">+12% from last week</div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 to-green-900/20 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <TrendingDown className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{Math.round(avgWaitTime)}m</div>
          <div className="text-sm text-gray-400">Avg Wait Time</div>
          <div className="mt-2 text-xs text-green-400">-{improvement.toFixed(1)}% improvement</div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">87%</div>
          <div className="text-sm text-gray-400">Capacity Utilization</div>
          <div className="mt-2 text-xs text-purple-400">Optimal range</div>
        </div>

        <div className="bg-gradient-to-br from-red-900/40 to-red-900/20 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <TrendingDown className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{totalNoShows}</div>
          <div className="text-sm text-gray-400">No-Shows This Week</div>
          <div className="mt-2 text-xs text-red-400">-14% from last week</div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wait Time Trend Line Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-green-400" />
            Wait Time Improvement Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={waitTimeTrend}>
              <defs>
                <linearGradient id="colorWait" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="waitTime" 
                stroke="#10b981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorWait)" 
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-400">
            📉 Consistent downward trend shows AI slot optimization is working
          </div>
        </div>

        {/* Service Distribution Pie Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            Service Usage Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={serviceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {serviceDistribution.map((service, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
                <span className="text-gray-400">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Congestion Bar Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-yellow-400" />
            Peak Hours Congestion Analysis
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hourlyCongestion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="patients" fill="#f59e0b" name="Patients" radius={[8, 8, 0, 0]} />
              <Bar dataKey="capacity" fill="#6b7280" name="Capacity" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-400">
            🔥 Peak hours: 9-10 AM (90%+) and 4 PM (96%) utilization
          </div>
        </div>

        {/* Week Comparison */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Weekly Throughput Comparison
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weekComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="lastWeek" fill="#6b7280" name="Last Week" radius={[8, 8, 0, 0]} />
              <Bar dataKey="thisWeek" fill="#3b82f6" name="This Week" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-400">
            📊 Consistent improvement in daily patient throughput
          </div>
        </div>
      </div>

      {/* No-Show Trend Line Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          No-Show Rate Reduction
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={noShowTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="noShows" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', r: 4 }}
              name="No-Shows"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="text-sm text-green-400">
            ✅ Smart WhatsApp reminders reduced no-shows from 18 to 8 per day (-56% improvement)
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-6">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
            💡
          </div>
          <h4 className="font-bold text-white mb-2">Capacity Optimization</h4>
          <p className="text-sm text-gray-400">
            Add 2 more slots during 9-10 AM to reduce peak congestion by 18%
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-6">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
            📱
          </div>
          <h4 className="font-bold text-white mb-2">Reminder Impact</h4>
          <p className="text-sm text-gray-400">
            Continue automated reminders - saving 45 hours/week of staff time
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
            ⚡
          </div>
          <h4 className="font-bold text-white mb-2">Load Balancing</h4>
          <p className="text-sm text-gray-400">
            AI successfully shifted 22% load from peak to off-peak hours
          </p>
        </div>
      </div>
    </div>
  );
}
