from flask import Flask, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return {"message": "VibeSync backend is running!"}

@app.route("/media/<path:filename>")
def media(filename):
    return send_from_directory("media", filename)

@app.route("/api/music")
def music():
    tracks = [
        {
            "id": 1,
            "title": "Midnight House",
            "artist": "VibeSync Radio",
            "cover": "images/midnight-house.jpg",
            "audio": "audio/midnight-house.mp3"
        },
        {
            "id": 2,
            "title": "After Hours",
            "artist": "VibeSync Radio",
            "cover": "images/after-hours.jpg",
            "audio": "audio/after-hours.mp3"
        },
        {
            "id": 3,
            "title": "City Lights",
            "artist": "VibeSync Radio",
            "cover": "images/city-lights.jpg",
            "audio": "audio/city-lights.mp3"
        }
    ]

    return {
        "tracks": tracks
    }


if __name__ == "__main__":
    app.run(debug=True)