from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Home route
@app.route("/")
def home():
    return jsonify({"message": "Backend is running 🚀"})

# Mock Database
notifications_db = [
    {
        "id": "1",
        "type": "reminder",
        "title": "Appointment Reminder",
        "message": "Your appointment is in 30 minutes",
        "time": "30 mins ago",
        "read": False
    },
    {
        "id": "2",
        "type": "success",
        "title": "Booking Confirmed",
        "message": "Appointment booked successfully",
        "time": "2 hours ago",
        "read": True
    }
]

# Notifications API - List
@app.route("/api/notifications", methods=["GET"])
def get_notifications():
    return jsonify(notifications_db)

# Notifications API - Mark as Read
@app.route("/api/notifications/<notification_id>/read", methods=["PATCH"])
def mark_read(notification_id):
    for n in notifications_db:
        if n["id"] == notification_id:
            n["read"] = True
            return jsonify({"status": "success", "message": "Notification marked as read"})
    return jsonify({"error": "Notification not found"}), 404

# Notifications API - Mark All as Read
@app.route("/api/notifications/read-all", methods=["POST"])
def mark_all_read():
    for n in notifications_db:
        n["read"] = True
    return jsonify({"status": "success", "message": "All notifications marked as read"})

if __name__ == '__main__':
    print("🚀 Flask Server running on http://localhost:5001")
    app.run(debug=True, port=5001)