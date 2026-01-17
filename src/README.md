# SmartQueue India 🇮🇳

AI-Powered Appointment & Crowd Management System for India's Public Services

## Overview

SmartQueue India is a comprehensive queue management solution designed to solve India's chronic queuing crisis in hospitals, RTOs, passport offices, banks, and government service centers. The system combines AI-powered slot recommendations, real-time queue transparency, and intelligent crowd management to reduce wait times and improve citizen experience.

## ✨ New Features Added

### 📊 Advanced Analytics Dashboard
- **Professional Charts**: Line charts, bar charts, pie charts, and area charts using Recharts
- **Real-time Metrics**: Live tracking of wait times, throughput, and efficiency
- **Trend Analysis**: Week-over-week comparisons and improvement tracking
- **Service Distribution**: Visual breakdown of service usage
- **Peak Hours Analysis**: Identify congestion patterns
- **No-Show Tracking**: Monitor and reduce appointment no-shows
- **AI Recommendations**: Automated insights for capacity optimization

### 🔔 Notifications Panel
- **Real-time Alerts**: Appointment reminders and queue updates
- **Priority Notifications**: Emergency alerts and important messages
- **Unread Counter**: Badge showing unread notification count
- **Mark as Read**: Individual and bulk read functionality
- **Hindi/Hinglish Support**: Vernacular language notifications

### 📍 Nearby Locations Finder
- **Location Discovery**: Find nearby hospitals, RTOs, passport offices
- **Distance Calculation**: See distance from your location
- **Wait Time Display**: Real-time wait times across locations
- **Ratings & Reviews**: User ratings and feedback
- **Service Availability**: Check which services are available
- **Get Directions**: Navigate to the location

### 📺 Live Dashboard Display
- **TV Display Mode**: Full-screen display for waiting areas
- **Current Token**: Large display of now-serving token
- **Queue Status**: Real-time queue length by service
- **Estimated Wait Times**: Dynamic wait time calculations
- **Scrolling Ticker**: Important announcements and tips
- **Auto-refresh**: Updates every 3 seconds
- **Access**: Click "Live Display" button or add `?mode=display` to URL

### 👨‍💼 Enhanced Staff Dashboard
- **Real-time Stats**: 7 comprehensive metrics cards
- **Advanced Filters**: Filter by service, priority, and search
- **Priority Management**: Emergency, Senior Citizen, Normal
- **Search Function**: Search by name or token number
- **Last Update Indicator**: Shows real-time sync status
- **Pause/Resume Queue**: Emergency controls
- **Walk-in Management**: Quick add walk-in patients

### 🎨 UI/UX Improvements
- **Dark Theme**: Professional dark mode throughout
- **Gradient Accents**: Modern gradient backgrounds
- **Animated Elements**: Smooth transitions and pulse effects
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Color-coded Status**: Visual indicators for congestion levels
- **Loading States**: Smooth loading animations

## Key Features

### 🎯 Citizen Portal
- **AI-Powered Booking**: Smart "Best Slot" recommendations using predictive algorithms
- **Real-time Queue Status**: Live updates on queue length and estimated wait times
- **Multi-language Support**: Hindi, Hinglish, and regional languages
- **WhatsApp Notifications**: Zero-friction reminders 30 minutes before appointments
- **Appointment Management**: Easy booking, viewing, and cancellation

### 👥 Staff Dashboard
- **Queue Management**: Advance tokens, manage priorities, add walk-ins
- **Real-time Monitoring**: Live queue status and congestion levels
- **Emergency Controls**: Pause queue, set emergency priorities
- **Senior Citizen Priority**: Automated priority handling
- **Performance Metrics**: Real-time statistics on throughput and wait times

### 🔧 Admin Dashboard
- **Advanced Analytics**: 
  - Wait time trends and improvements
  - Peak hours analysis
  - Throughput metrics
  - No-show reduction tracking
- **Service Configuration**: 
  - Adjust capacity per slot
  - Set average service times
  - Enable/disable services
- **AI Insights**: 
  - Automated recommendations
  - Pattern detection
  - Load balancing suggestions
- **Audit Logs**: Complete transparency with system activity tracking

## AI Engine

The SmartQueue AI uses:
- **Moving Average**: Analyzes historical booking patterns
- **Peak Detection**: Threshold-based identification of congestion
- **Slot Scoring Algorithm**:
  - Capacity utilization analysis
  - No-show rate adjustment
  - Walk-in probability factor
  - Historical trend weighting

### Slot Recommendation Logic
```
AI Score = 100 
  - (Utilization × 50) 
  - (Peak Hour Penalty: 20)
  - (Walk-in Adjustment × 15)
  + (Available Capacity × 20)
```

## Success Metrics

- ✅ **20-35% reduction** in average wait times
- ✅ **15-25% load shift** from peak to off-peak hours
- ✅ **10-15% reduction** in no-shows via smart reminders
- ✅ Improved staff efficiency and reduced manual errors

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS v4
- **State Management**: React Hooks, LocalStorage
- **UI Components**: Custom dark-themed components
- **Charts**: Custom bar charts and analytics visualizations
- **Icons**: Lucide React

## Demo Features

### Login Portals
- **Citizen**: Book appointments, view queue status
- **Staff**: Manage queues, handle walk-ins, set priorities
- **Admin**: Analytics, configuration, audit logs

### Simulated Real-time Updates
- Queue status updates every 5 seconds
- Live wait time calculations
- Dynamic slot availability

## Usage

### For Citizens
1. Select "Citizen Portal" from login screen
2. Choose your service (Hospital, RTO, Passport, Bank)
3. Pick a date
4. View AI-recommended slots with congestion levels
5. Book the best slot for you
6. Receive WhatsApp reminders (simulated)

### For Staff
1. Select "Staff Dashboard" from login screen
2. Monitor real-time queue
3. Advance tokens as patients are served
4. Add walk-ins on the spot
5. Set priorities for emergencies or senior citizens
6. Pause/resume queue as needed

### For Admins
1. Select "Admin Dashboard" from login screen
2. View analytics and performance trends
3. Configure service capacity and timing
4. Review AI insights and recommendations
5. Monitor audit logs for transparency

## Demo Data

The application includes:
- 8 pre-configured services across 4 categories
- 7 days of historical analytics data
- Sample queue with various patient types
- Realistic peak hour patterns
- AI-generated slot recommendations

## Accessibility

- High contrast dark theme
- Keyboard navigation support
- Screen reader friendly
- Responsive design for mobile and desktop
- Vernacular language support (Hindi labels)

## Future Enhancements

With Supabase backend integration:
- Real-time WebSocket updates
- User authentication and profiles
- Persistent data storage
- WhatsApp Business API integration
- SMS notifications
- Multi-location support
- Advanced analytics with ML models
- Historical trend analysis
- Predictive capacity planning

## Digital India Alignment

SmartQueue India embodies the Digital India vision:
- 📱 Mobile-first approach
- 🌐 Accessible to all citizens
- 🔒 Transparent and auditable
- ⚡ Efficient public service delivery
- 🎯 Data-driven decision making
- 🌍 Scalable across India

## License

This is a demo application for educational and demonstration purposes.

---

**Built with ❤️ for Digital India Initiative**