from flask import Flask, jsonify
import os, socket
from datetime import datetime

app = Flask(__name__)

ENV = os.getenv("ENV_VALUE", "No env set")
HOSTNAME = socket.gethostname()

@app.get("/")
def hello():
    return jsonify({
        "message": "Hello from Simple App (Python Flask)",
        "env": ENV,
        "container": HOSTNAME
    })

# Health Check API
@app.get("/health")
def health():
    return jsonify({
        "status": "UP",
        "timestamp": datetime.now().isoformat()
    })


# Environment Details API
@app.get("/info")
def info():
    return jsonify({
        "hostname": HOSTNAME,
        "environment": ENV,
        "python_version": os.sys.version
    })


# Greeting API
@app.get("/greet/<name>")
def greet(name):
    return jsonify({
        "message": f"Hello, {name}!"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)