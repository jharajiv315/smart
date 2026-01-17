import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, AlertTriangle, UserPlus, CheckCircle2, Clock, Users, Filter, Search, RefreshCw } from 'lucide-react';
import { getStoredQueue, saveQueue, MOCK_SERVICES } from '../utils/mockData';
import { QueueItem } from '../types';
import { RealtimeStats } from './StatsCard';

export function StaffDashboard() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [selectedService, setSelectedService] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [showAddWalkIn, setShowAddWalkIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'emergency' | 'senior' | 'normal'>('all');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    loadQueue();
    // Simulate real-time updates
    const interval = setInterval(() => {
      loadQueue();
      setLastUpdate(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadQueue = () => {
    const currentQueue = getStoredQueue();
    setQueue(currentQueue);
  };

  const filteredQueue = queue.filter(item => {
    const serviceMatch = selectedService === 'all' || item.serviceId === selectedService;
    const searchMatch = searchQuery === '' || 
      item.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const priorityMatch = filterPriority === 'all' || item.priority === filterPriority;
    return serviceMatch && searchMatch && priorityMatch;
  });

  const advanceToken = (id: string) => {
    const updated = queue.map(item => {
      if (item.id === id && item.status === 'in-progress') {
        return {
          ...item,
          status: 'completed' as const,
          completionTime: new Date().toISOString(),
        };
      }
      return item;
    });

    // Start next waiting token
    const nextWaiting = updated.find(item => item.status === 'waiting');
    if (nextWaiting) {
      const finalUpdated = updated.map(item => {
        if (item.id === nextWaiting.id) {
          return {
            ...item,
            status: 'in-progress' as const,
            startTime: new Date().toISOString(),
          };
        }
        return item;
      });
      setQueue(finalUpdated);
      saveQueue(finalUpdated);
    } else {
      setQueue(updated);
      saveQueue(updated);
    }
  };

  const skipToken = (id: string) => {
    const updated = queue.map(item => 
      item.id === id ? { ...item, status: 'skipped' as const } : item
    );
    setQueue(updated);
    saveQueue(updated);
  };

  const setPriority = (id: string, priority: 'normal' | 'emergency' | 'senior') => {
    const updated = queue.map(item => 
      item.id === id ? { ...item, priority } : item
    );
    
    // Re-sort queue by priority
    const sorted = [...updated].sort((a, b) => {
      const priorityOrder = { emergency: 0, senior: 1, normal: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    setQueue(sorted);
    saveQueue(sorted);
  };

  const addWalkIn = (serviceName: string, citizenName: string) => {
    const service = MOCK_SERVICES.find(s => s.name === serviceName);
    if (!service) return;

    const newToken: QueueItem = {
      id: `q-${Date.now()}`,
      tokenNumber: `W${Math.floor(Math.random() * 900) + 100}`,
      serviceId: service.id,
      serviceName: service.name,
      citizenName,
      status: 'waiting',
      arrivalTime: new Date().toISOString(),
      priority: 'normal',
      waitTime: 0,
    };

    const updated = [...queue, newToken];
    setQueue(updated);
    saveQueue(updated);
    setShowAddWalkIn(false);
  };

  const getWaitingTime = (arrivalTime: string): number => {
    const arrival = new Date(arrivalTime);
    const now = new Date();
    return Math.floor((now.getTime() - arrival.getTime()) / 60000);
  };

  const stats = {
    total: filteredQueue.length,
    waiting: filteredQueue.filter(q => q.status === 'waiting').length,
    inProgress: filteredQueue.filter(q => q.status === 'in-progress').length,
    completed: filteredQueue.filter(q => q.status === 'completed').length,
    avgWait: Math.round(
      filteredQueue.filter(q => q.status === 'waiting').reduce((acc, q) => acc + getWaitingTime(q.arrivalTime), 0) /
      (filteredQueue.filter(q => q.status === 'waiting').length || 1)
    ),
    todayTotal: queue.length,
    efficiency: 87,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Real-time Stats */}
      <RealtimeStats stats={stats} />

      {/* Controls */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Service Filter */}
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Services</option>
            {MOCK_SERVICES.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="emergency">Emergency</option>
            <option value="senior">Senior Citizen</option>
            <option value="normal">Normal</option>
          </select>

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or token..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pause/Resume Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              isPaused 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>

          {/* Add Walk-in Button */}
          <button
            onClick={() => setShowAddWalkIn(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add Walk-in
          </button>
        </div>

        {/* Last Update Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <RefreshCw className="w-4 h-4" />
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          {isPaused && (
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-900/30 border border-yellow-500 rounded-lg text-yellow-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Queue Paused</span>
            </div>
          )}
        </div>
      </div>

      {/* Queue List */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Active Queue
          </h2>
        </div>

        <div className="divide-y divide-gray-800">
          {filteredQueue.filter(q => q.status !== 'completed').length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No active tokens in queue</p>
            </div>
          ) : (
            filteredQueue
              .filter(q => q.status !== 'completed')
              .map((item) => (
                <div
                  key={item.id}
                  className={`p-6 ${
                    item.status === 'in-progress' 
                      ? 'bg-blue-900/20 border-l-4 border-l-blue-500' 
                      : item.priority === 'emergency'
                      ? 'bg-red-900/20 border-l-4 border-l-red-500'
                      : item.priority === 'senior'
                      ? 'bg-purple-900/20 border-l-4 border-l-purple-500'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{item.tokenNumber}</div>
                        <div className="text-xs text-gray-400">Token</div>
                      </div>
                      
                      <div>
                        <div className="font-bold text-white mb-1">{item.citizenName}</div>
                        <div className="text-sm text-gray-400">{item.serviceName}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.status === 'waiting' && (
                        <div className="text-right">
                          <div className="text-sm text-gray-400">Waiting</div>
                          <div className="text-lg font-bold text-yellow-400">
                            {getWaitingTime(item.arrivalTime)} min
                          </div>
                        </div>
                      )}
                      
                      {item.status === 'in-progress' && (
                        <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                          In Progress
                        </div>
                      )}
                      
                      {item.priority === 'emergency' && (
                        <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Emergency
                        </div>
                      )}
                      
                      {item.priority === 'senior' && (
                        <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                          Senior Citizen
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status === 'in-progress' && (
                      <button
                        onClick={() => advanceToken(item.id)}
                        disabled={isPaused}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Complete & Next
                      </button>
                    )}
                    
                    {item.status === 'waiting' && (
                      <>
                        <button
                          onClick={() => skipToken(item.id)}
                          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                          <SkipForward className="w-4 h-4" />
                          Skip
                        </button>
                        
                        <select
                          value={item.priority}
                          onChange={(e) => setPriority(item.id, e.target.value as any)}
                          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="normal">Normal Priority</option>
                          <option value="senior">Senior Citizen</option>
                          <option value="emergency">Emergency</option>
                        </select>
                      </>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Add Walk-in Modal */}
      {showAddWalkIn && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Add Walk-in Patient</h3>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                addWalkIn(
                  formData.get('service') as string,
                  formData.get('name') as string
                );
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Citizen Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter name"
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service
                  </label>
                  <select
                    name="service"
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {MOCK_SERVICES.map(service => (
                      <option key={service.id} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Add to Queue
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddWalkIn(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}