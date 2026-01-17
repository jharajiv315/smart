from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Home route
@app.route("/")
def home():
    return jsonify({"message": "Backend is running 🚀"})

# Notifications API
@app.route("/api/notifications", methods=["GET"])
def notifications():
    return jsonify([
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
    ])

if __name__ == '__main__':
    print("🚀 Flask Server running on http://127.0.0.1:5001")
    app.run(debug=True, port=5001)