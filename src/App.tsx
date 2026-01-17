import { useState, useEffect } from 'react';
import { CitizenPortal } from './components/CitizenPortal';
import { StaffDashboard } from './components/StaffDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginPage } from './components/LoginPage';
import { LiveDashboard } from './components/LiveDashboard';
import { HelpGuide } from './components/HelpGuide';
import { Users, UserCog, Shield, Monitor } from 'lucide-react';

type UserRole = 'citizen' | 'staff' | 'admin' | 'display' | null;

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLiveDashboard, setShowLiveDashboard] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole as UserRole);
      setIsLoggedIn(true);
    }
    
    // Check for display mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'display') {
      setShowLiveDashboard(true);
    }
  }, []);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    if (role) {
      localStorage.setItem('userRole', role);
    }
    if (role === 'display') {
      setShowLiveDashboard(true);
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    setShowLiveDashboard(false);
    localStorage.removeItem('userRole');
  };

  // Full-screen live dashboard mode
  if (showLiveDashboard) {
    return <LiveDashboard />;
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">SmartQueue India</h1>
                <p className="text-xs text-gray-400">AI-Powered Queue Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Live Dashboard Button */}
              <button
                onClick={() => setShowLiveDashboard(true)}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 hover:text-white rounded-lg text-sm transition-colors flex items-center gap-2"
                title="Open Live Dashboard Display"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Live Display</span>
              </button>
              
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-lg">
                {userRole === 'citizen' && <Users className="w-4 h-4 text-blue-400" />}
                {userRole === 'staff' && <UserCog className="w-4 h-4 text-green-400" />}
                {userRole === 'admin' && <Shield className="w-4 h-4 text-purple-400" />}
                <span className="text-sm text-gray-300 capitalize">{userRole}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {userRole === 'citizen' && <CitizenPortal />}
        {userRole === 'staff' && <StaffDashboard />}
        {userRole === 'admin' && <AdminDashboard />}
      </main>

      {/* Help Guide - Floating Button */}
      <HelpGuide />

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2026 SmartQueue India | Digital India Initiative | Reducing Wait Times Across India
          </p>
        </div>
      </footer>
    </div>
  );
}