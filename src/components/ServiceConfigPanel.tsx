import { useState } from 'react';
import { Save, ToggleLeft, ToggleRight, Settings } from 'lucide-react';
import { Service } from '../types';

interface ServiceConfigPanelProps {
  services: Service[];
}

export function ServiceConfigPanel({ services }: ServiceConfigPanelProps) {
  const [editingService, setEditingService] = useState<string | null>(null);
  const [configs, setConfigs] = useState(
    services.reduce((acc, service) => {
      acc[service.id] = {
        capacity: service.capacity,
        averageTime: service.averageTime,
        enabled: service.enabled,
      };
      return acc;
    }, {} as Record<string, { capacity: number; averageTime: number; enabled: boolean }>)
  );

  const handleSave = (serviceId: string) => {
    // In real app, save to backend
    console.log('Saving config for', serviceId, configs[serviceId]);
    setEditingService(null);
  };

  const toggleEnabled = (serviceId: string) => {
    setConfigs(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        enabled: !prev[serviceId].enabled,
      },
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Service Configuration</h3>
        <div className="text-sm text-gray-400">
          Configure capacity, timing, and availability for each service
        </div>
      </div>

      {services.map((service) => {
        const config = configs[service.id];
        const isEditing = editingService === service.id;

        return (
          <div
            key={service.id}
            className={`bg-gray-800 border rounded-xl p-6 transition-all ${
              config.enabled ? 'border-gray-700' : 'border-gray-800 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-white">{service.name}</h4>
                  <span className="text-sm text-gray-500">({service.nameHindi})</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    service.category === 'hospital' ? 'bg-red-500/20 text-red-400' :
                    service.category === 'rto' ? 'bg-blue-500/20 text-blue-400' :
                    service.category === 'passport' ? 'bg-green-500/20 text-green-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {service.category.toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleEnabled(service.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-700"
              >
                {config.enabled ? (
                  <>
                    <ToggleRight className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-green-400">Enabled</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-500">Disabled</span>
                  </>
                )}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Capacity per Slot
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={config.capacity}
                      onChange={(e) => setConfigs(prev => ({
                        ...prev,
                        [service.id]: {
                          ...prev[service.id],
                          capacity: parseInt(e.target.value),
                        },
                      }))}
                      className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Average Time (minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="60"
                      step="5"
                      value={config.averageTime}
                      onChange={(e) => setConfigs(prev => ({
                        ...prev,
                        [service.id]: {
                          ...prev[service.id],
                          averageTime: parseInt(e.target.value),
                        },
                      }))}
                      className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleSave(service.id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Capacity/Slot</div>
                    <div className="text-lg font-bold text-white">{config.capacity}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Avg Time</div>
                    <div className="text-lg font-bold text-white">{config.averageTime}m</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Daily Capacity</div>
                    <div className="text-lg font-bold text-white">{config.capacity * 9}</div>
                  </div>
                </div>

                <button
                  onClick={() => setEditingService(service.id)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Configure
                </button>
              </div>
            )}
          </div>
        );
      })}

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
        <h4 className="font-bold text-white mb-2">📌 Configuration Tips</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Increase capacity during peak hours (9-10 AM, 4-5 PM) to reduce congestion</li>
          <li>• Set realistic average times - AI uses this for wait time predictions</li>
          <li>• Disable services temporarily during maintenance or staff shortage</li>
          <li>• Monitor analytics to optimize capacity allocation</li>
        </ul>
      </div>
    </div>
  );
}
