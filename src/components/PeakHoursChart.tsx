export function PeakHoursChart() {
  const peakData = [
    { hour: '09:00', bookings: 45, label: 'Peak' },
    { hour: '10:00', bookings: 52, label: 'Peak' },
    { hour: '11:00', bookings: 32, label: 'Normal' },
    { hour: '12:00', bookings: 18, label: 'Low' },
    { hour: '13:00', bookings: 22, label: 'Low' },
    { hour: '14:00', bookings: 35, label: 'Normal' },
    { hour: '15:00', bookings: 38, label: 'Normal' },
    { hour: '16:00', bookings: 48, label: 'Peak' },
    { hour: '17:00', bookings: 42, label: 'Normal' },
  ];

  const maxBookings = Math.max(...peakData.map(d => d.bookings));

  return (
    <div>
      <div className="mb-6 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-gray-400">Peak Hours</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-gray-400">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-400">Low Congestion</span>
        </div>
      </div>

      <div className="flex items-end justify-between h-48 gap-2">
        {peakData.map((item) => {
          const heightPercentage = (item.bookings / maxBookings) * 100;
          const color = 
            item.label === 'Peak' ? 'from-red-500 to-red-600' :
            item.label === 'Normal' ? 'from-yellow-500 to-yellow-600' :
            'from-green-500 to-green-600';

          return (
            <div key={item.hour} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative group flex-1 w-full flex items-end">
                <div
                  className={`w-full bg-gradient-to-t ${color} rounded-t-lg transition-all hover:opacity-80 cursor-pointer`}
                  style={{ height: `${heightPercentage}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                    <div className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-xs whitespace-nowrap">
                      <div className="text-white font-bold">{item.bookings} bookings</div>
                      <div className="text-gray-400">{item.label} period</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 font-medium">{item.hour}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-900 rounded-lg">
        <div className="text-sm text-gray-300 mb-2">
          <span className="font-bold text-yellow-400">💡 AI Insight:</span> Morning (9-10 AM) and evening (4 PM) show highest congestion.
        </div>
        <div className="text-xs text-gray-500">
          Recommendation: Encourage citizens to book 11 AM - 2 PM slots through AI "Best Slot" suggestions.
        </div>
      </div>
    </div>
  );
}
