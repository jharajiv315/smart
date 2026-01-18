import { useState, useEffect } from 'react';
import { Activity, Users, TrendingUp, Bell, X } from 'lucide-react';
import { getStoredQueue, MOCK_SERVICES } from '../utils/mockData';
import { DashboardClock } from './DashboardClock';
import { QueueItem } from '../types';

interface LiveDashboardProps {
  onClose: () => void;
}

export function LiveDashboard({ onClose }: LiveDashboardProps) {
  const [queue, setQueue] = useState<QueueItem[]>(getStoredQueue());
  const [currentToken, setCurrentToken] = useState('A105');

  // Handle keyboard (Esc) to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newQueue = getStoredQueue();
      // Simple optimization: JSON stringify compare (simulating deep equal) 
      // In a real app, we'd use a better deep comparison or React Query
      setQueue(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(newQueue)) {
          return newQueue;
        }
        return prev;
      });

      // Simulate token changes
      const tokens = ['A105', 'B203', 'C412', 'A106'];
      setCurrentToken(tokens[Math.floor(Math.random() * tokens.length)]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const services = MOCK_SERVICES.slice(0, 4);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden z-[100]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">SmartQueue India</h1>
              <p className="text-lg text-blue-100">Live Queue Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <DashboardClock />
             
             <button 
               onClick={onClose}
               className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
               title="Exit Live Display (Esc)"
               aria-label="Exit Live Display"
             >
               <X className="w-8 h-8" />
             </button>
          </div>
        </div>
      </div>

      {/* Current Token Display */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-4 border-green-500 rounded-3xl p-12 mb-12 animate-pulse">
          <div className="text-center">
            <div className="text-2xl text-green-400 mb-4 flex items-center justify-center gap-3">
              <Bell className="w-8 h-8 animate-bounce" />
              <span>NOW SERVING</span>
            </div>
            <div className="text-9xl font-bold text-white mb-4">{currentToken}</div>
            <div className="text-3xl text-gray-300">Please proceed to Counter 1</div>
          </div>
        </div>

        {/* Service-wise Queue Status */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {services.map((service, idx) => {
            // In a real app, calculate from 'queue' prop
            const queueLength = Math.floor(Math.random() * 15) + 5; 
            const waitTime = queueLength * service.averageTime;
            
            return (
              <div key={service.id} className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{service.name}</h3>
                    <p className="text-xl text-gray-400">{service.nameHindi}</p>
                  </div>
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                    idx === 0 ? 'bg-red-500/20' :
                    idx === 1 ? 'bg-blue-500/20' :
                    idx === 2 ? 'bg-green-500/20' :
                    'bg-purple-500/20'
                  }`}>
                    <Users className={`w-10 h-10 ${
                      idx === 0 ? 'text-red-400' :
                      idx === 1 ? 'text-blue-400' :
                      idx === 2 ? 'text-green-400' :
                      'text-purple-400'
                    }`} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">{queueLength}</div>
                    <div className="text-lg text-gray-400">People Waiting</div>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-yellow-400 mb-2">~{waitTime}m</div>
                    <div className="text-lg text-gray-400">Est. Wait Time</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ticker */}
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-6 overflow-hidden">
          <div className="flex items-center gap-4 animate-marquee">
            <TrendingUp className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <div className="text-2xl text-white whitespace-nowrap">
              📱 Book appointments via SmartQueue app • 🎯 AI suggests best time slots • 
              ⚡ Reduce wait time by 30% • 💡 Peak hours: 9-10 AM, avoid for faster service • 
              🔔 Get WhatsApp reminders • ✅ Digital India Initiative
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 border-t border-gray-800 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-lg text-gray-400">
          <span>🇮🇳 Powered by SmartQueue India</span>
          <span>Help Desk: 1800-XXX-XXXX</span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            System Online
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
