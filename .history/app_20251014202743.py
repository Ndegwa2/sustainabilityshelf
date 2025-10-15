from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'sustainable_shelf.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Import models after db initialization to avoid circular imports
from models import db, User, Product, Review, Purchase

# Initialize database
db.init_app(app)

# Import routes
from routes import *

# Create tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)