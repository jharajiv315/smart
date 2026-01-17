import { Bell, Check, Clock, X, MessageSquare, AlertTriangle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'reminder' | 'update' | 'alert' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const API_BASE_URL = 'http://localhost:5001';

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/notifications`);
      if (!response.ok) {
        throw new Error(`Failed to fetch notifications: ${response.statusText}`);
      }
      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    // Optimistic update
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );

    try {
      // Assuming a PATCH/PUT endpoint exists for marking as read
      await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
        method: 'PATCH',
      });
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    // Optimistic update
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));

    try {
      await fetch(`${API_BASE_URL}/api/notifications/read-all`, {
        method: 'POST',
      });
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const displayNotifications = showAll ? notifications : notifications.slice(0, 3);

  const getIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Clock className="w-5 h-5 text-blue-400" />;
      case 'update': return <Bell className="w-5 h-5 text-yellow-400" />;
      case 'alert': return <MessageSquare className="w-5 h-5 text-orange-400" />;
      case 'success': return <Check className="w-5 h-5 text-green-400" />;
      default: return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-blue-400" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                {unreadCount}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            <p className="text-xs text-gray-400">{unreadCount} unread messages</p>
          </div>
        </div>
        {!loading && !error && unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
          <p>Loading notifications...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
          <h3 className="text-white font-bold mb-2">Failed to load</h3>
          <p className="text-sm text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchNotifications}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all ${notification.read
                ? 'bg-gray-800 border-gray-700'
                : 'bg-blue-900/20 border-blue-500/30'
                }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-bold text-white text-sm">{notification.title}</h4>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-400">{notification.message}</p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && notifications.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-blue-400 rounded-lg text-sm font-medium transition-colors"
        >
          {showAll ? 'Show Less' : `View All (${notifications.length})`}
        </button>
      )}
    </div>
  );
}
