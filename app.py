from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from werkzeug.serving import WSGIRequestHandler

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'sustainable_shelf.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Import db and models after app initialization to avoid circular imports
from db import db
from models import User, Product, Review, Purchase

# Initialize database
db.init_app(app)

# Import routes
from routes import *

# Create tables
with app.app_context():
    db.create_all()

# Custom request handler to handle large headers
class CustomWSGIRequestHandler(WSGIRequestHandler):
    def handle(self):
        # Increase limits for headers
        self.max_header_count = 200
        self.max_header_size = 65536  # 64KB per header
        super().handle()

if __name__ == '__main__':
    # Increase max header size to handle large requests
    WSGIRequestHandler.max_content_length = 1024 * 1024 * 100  # 100MB
    app.run(debug=True, host='0.0.0.0', port=5000, request_handler=CustomWSGIRequestHandler)