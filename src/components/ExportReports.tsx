import { Download, FileText, FileSpreadsheet, FileBarChart, Calendar } from 'lucide-react';
import { getMockAnalytics } from '../utils/mockData';

export function ExportReports() {
  const exportToCSV = () => {
    const analytics = getMockAnalytics();
    const headers = ['Date', 'Total Appointments', 'Walk-ins', 'Avg Wait Time', 'Peak Hour', 'No-Shows', 'Throughput'];
    const rows = analytics.map(d => [
      d.date,
      d.totalAppointments,
      d.walkIns,
      d.averageWaitTime,
      d.peakHour,
      d.noShows,
      d.throughput
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartqueue-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const exportSummaryPDF = () => {
    alert('📄 PDF Export: In production, this would generate a comprehensive PDF report with charts and insights.');
  };

  const exportWeeklyReport = () => {
    alert('📊 Weekly Report: Generating weekly performance summary...');
  };

  const exportMonthlyReport = () => {
    alert('📈 Monthly Report: Generating monthly analytics report...');
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Download className="w-5 h-5 text-blue-400" />
        Export Reports & Data
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={exportToCSV}
          className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all text-left"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white">Export to CSV</h4>
              <p className="text-xs text-gray-400">Download raw analytics data</p>
            </div>
          </div>
        </button>

        <button
          onClick={exportSummaryPDF}
          className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all text-left"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white">Summary PDF</h4>
              <p className="text-xs text-gray-400">Comprehensive report with charts</p>
            </div>
          </div>
        </button>

        <button
          onClick={exportWeeklyReport}
          className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all text-left"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white">Weekly Report</h4>
              <p className="text-xs text-gray-400">Last 7 days performance</p>
            </div>
          </div>
        </button>

        <button
          onClick={exportMonthlyReport}
          className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all text-left"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <FileBarChart className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white">Monthly Report</h4>
              <p className="text-xs text-gray-400">30-day analytics summary</p>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <p className="text-sm text-blue-300">
          💡 <strong>Tip:</strong> Reports are generated based on real-time data and include AI insights for decision making.
        </p>
      </div>
    </div>
  );
}
