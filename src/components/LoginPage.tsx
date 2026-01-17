import { Users, UserCog, Shield, Clock, TrendingDown, Award } from 'lucide-react';

type UserRole = 'citizen' | 'staff' | 'admin' | null;

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            SmartQueue India
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            AI-Powered Appointment & Crowd Management System
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Solving India's queuing crisis with predictive slot booking, real-time transparency, and intelligent crowd management
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingDown className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">20-35%</div>
            <div className="text-sm text-gray-400">Reduction in Wait Times</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">15-25%</div>
            <div className="text-sm text-gray-400">Peak Load Shifted</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">10-15%</div>
            <div className="text-sm text-gray-400">No-Show Reduction</div>
          </div>
        </div>

        {/* Login Options */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Choose Your Portal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Citizen Portal */}
            <button
              onClick={() => onLogin('citizen')}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-6 text-left transition-all hover:scale-105 hover:border-blue-500"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Citizen Portal</h3>
              <p className="text-sm text-gray-400 mb-4">
                Book appointments, view queue status, get AI slot suggestions
              </p>
              <div className="text-blue-400 text-sm font-medium">Login as Citizen →</div>
            </button>

            {/* Staff Dashboard */}
            <button
              onClick={() => onLogin('staff')}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-6 text-left transition-all hover:scale-105 hover:border-green-500"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <UserCog className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Staff Dashboard</h3>
              <p className="text-sm text-gray-400 mb-4">
                Manage queues, advance tokens, monitor congestion levels
              </p>
              <div className="text-green-400 text-sm font-medium">Login as Staff →</div>
            </button>

            {/* Admin Dashboard */}
            <button
              onClick={() => onLogin('admin')}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-6 text-left transition-all hover:scale-105 hover:border-purple-500"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Admin Dashboard</h3>
              <p className="text-sm text-gray-400 mb-4">
                Configure services, view analytics, manage system settings
              </p>
              <div className="text-purple-400 text-sm font-medium">Login as Admin →</div>
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h4 className="font-bold text-white mb-3">🎯 Key Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>✓ AI-powered "Best Slot" recommendations</li>
              <li>✓ Real-time queue status & ETA updates</li>
              <li>✓ WhatsApp/PWA notifications (Hindi, Hinglish)</li>
              <li>✓ Emergency override controls</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h4 className="font-bold text-white mb-3">🚀 Use Cases</h4>
            <ul className="space-y-2 text-gray-400">
              <li>✓ Hospitals & Healthcare Centers</li>
              <li>✓ RTOs & Passport Offices</li>
              <li>✓ Banks & Financial Services</li>
              <li>✓ Government Service Centers</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-600">
            Demo Version | Part of Digital India Initiative | No Real Data Collection
          </p>
        </div>
      </div>
    </div>
  );
}
