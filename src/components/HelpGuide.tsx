import { HelpCircle, Video, BookOpen, Phone, Mail, MessageCircle } from 'lucide-react';

export function HelpGuide() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => {
          const helpModal = document.getElementById('help-modal');
          if (helpModal) {
            helpModal.classList.toggle('hidden');
          }
        }}
        className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="Help & Support"
      >
        <HelpCircle className="w-7 h-7 text-white" />
      </button>

      {/* Help Modal */}
      <div
        id="help-modal"
        className="hidden fixed inset-0 bg-black/70 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            e.currentTarget.classList.add('hidden');
          }
        }}
      >
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Help & Support</h2>
              <p className="text-sm text-gray-400">SmartQueue India - Quick Guide</p>
            </div>
          </div>

          {/* Quick Start Guides */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">📚 Quick Start Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-blue-500 transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Citizen Guide</h4>
                  <p className="text-sm text-gray-400">Learn how to book appointments and view queue status</p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-green-500 transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                    <Video className="w-5 h-5 text-green-400" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Staff Tutorial</h4>
                  <p className="text-sm text-gray-400">Queue management and priority handling</p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-purple-500 transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Admin Manual</h4>
                  <p className="text-sm text-gray-400">Analytics, configuration, and reports</p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">❓ Frequently Asked Questions</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">How do I book an appointment?</h4>
                  <p className="text-sm text-gray-400">
                    Login as Citizen → Select Service → Choose Date → View AI recommendations → Click to book your preferred slot
                  </p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">What is AI "Best Slot" recommendation?</h4>
                  <p className="text-sm text-gray-400">
                    Our AI analyzes historical data, current bookings, and congestion patterns to suggest slots with minimal wait time
                  </p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">How do I check real-time queue status?</h4>
                  <p className="text-sm text-gray-400">
                    The queue status is displayed on the Citizen Portal and updates automatically every 5 seconds
                  </p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">Can staff add walk-in patients?</h4>
                  <p className="text-sm text-gray-400">
                    Yes! Staff can click "Add Walk-in" button, enter patient details, and they'll be added to the queue
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">📞 Contact Support</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="tel:1800-XXX-XXXX" className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-blue-500 transition-all text-center">
                  <Phone className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="font-bold text-white mb-1">Helpline</div>
                  <div className="text-sm text-gray-400">1800-XXX-XXXX</div>
                </a>

                <a href="mailto:support@smartqueue.in" className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-green-500 transition-all text-center">
                  <Mail className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="font-bold text-white mb-1">Email</div>
                  <div className="text-sm text-gray-400">support@smartqueue.in</div>
                </a>

                <a href="#" className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-purple-500 transition-all text-center">
                  <MessageCircle className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="font-bold text-white mb-1">Live Chat</div>
                  <div className="text-sm text-gray-400">9 AM - 6 PM</div>
                </a>
              </div>
            </div>

            {/* Features Overview */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">✨ Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">AI-powered slot recommendations</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Real-time queue updates</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">WhatsApp/SMS reminders</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Priority queue management</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Advanced analytics & reports</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Multi-language support</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const helpModal = document.getElementById('help-modal');
              if (helpModal) {
                helpModal.classList.add('hidden');
              }
            }}
            className="mt-6 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Close Help
          </button>
        </div>
      </div>
    </div>
  );
}
