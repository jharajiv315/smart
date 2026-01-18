import { Shield, UserCog, Users, AlertTriangle, ArrowRight, PauseCircle } from 'lucide-react';

export type UserRole = 'citizen' | 'staff' | 'admin' | 'display' | null;

interface RoleSwitchModalProps {
  isOpen: boolean;
  targetRole: UserRole;
  currentRole: UserRole;
  onClose: () => void;
  onConfirm: () => void;
}

export function RoleSwitchModal({ isOpen, targetRole, currentRole, onClose, onConfirm }: RoleSwitchModalProps) {
  if (!isOpen || !targetRole) return null;

  // Configuration for modal content based on TARGET role
  const config = {
    admin: {
      title: 'Switch to Admin Mode',
      subtitle: 'System-level access and configuration',
      icon: Shield,
      color: 'purple',
      warning: '⚠️ Admin actions impact all users and services.',
      body: (
        <ul className="space-y-3 text-gray-300 text-sm">
          <li className="flex gap-2">
            <span className="text-purple-400">✓</span>
            Access system configuration & analytics
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400">✓</span>
            Manage staff and permissions
          </li>
          <li className="flex gap-2">
            <span className="text-red-400">!</span>
            Changes affect live operations immediately
          </li>
        </ul>
      )
    },
    staff: {
      title: 'Switch to Staff Mode',
      subtitle: 'Live queue operations',
      icon: UserCog,
      color: 'green',
      info: currentRole === 'staff' ? null : 'Your current view will be replaced by the staff dashboard.',
      body: (
        <div className="space-y-4">
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex gap-2">
              <span className="text-green-400">✓</span>
              Manage active queues and tokens
            </li>
            <li className="flex gap-2">
              <span className="text-green-400">✓</span>
              Handle priority cases
            </li>
          </ul>
          {(currentRole === 'admin' || currentRole === 'citizen') && (
            <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <PauseCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <p className="text-xs text-blue-200">
                Any active queue session from a previous shift will be resumed safely.
              </p>
            </div>
          )}
        </div>
      )
    },
    citizen: {
      title: 'Switch to Citizen View',
      subtitle: 'Appointments & queue tracking',
      icon: Users,
      color: 'blue',
      body: (
        <div className="space-y-4">
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex gap-2">
              <span className="text-blue-400">✓</span>
              Book appointments & track visits
            </li>
            <li className="flex gap-2">
              <span className="text-gray-500">×</span>
               Lose access to staff/admin controls
            </li>
          </ul>
          <p className="text-xs text-gray-400 italic">
            No data will be deleted. Your previous role session state will remain intact.
          </p>
        </div>
      )
    }
  };

  const activeConfig = config[targetRole as keyof typeof config];
  if (!activeConfig) return null;

  const colorStyles = {
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  }[activeConfig.color];

  const btnStyles = {
    purple: 'bg-purple-600 hover:bg-purple-700',
    green: 'bg-green-600 hover:bg-green-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
  }[activeConfig.color];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorStyles}`}>
              <activeConfig.icon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-1">{activeConfig.title}</h2>
              <p className="text-sm text-gray-400">{activeConfig.subtitle}</p>
            </div>
          </div>

          {/* Body */}
          <div className="mb-8">
            {activeConfig.body}
          </div>

          {/* Warning (if applicable) */}
          {(activeConfig as any).warning && (
            <div className="mb-6 flex gap-3 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-200">{(activeConfig as any).warning}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2.5 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${btnStyles}`}
            >
              Confirm Switch
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
