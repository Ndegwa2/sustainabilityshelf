from flask import jsonify, request
from app import app, db
from models import User, Product, Review, Purchase
import hashlib

# User routes
@app.route('/api/users/register', methods=['POST'])
def register_user():
    data = request.get_json()
    
    # Check if user already exists
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400
    
    # Hash password
    password_hash = hashlib.sha256(data['password'].encode()).hexdigest()
    
    # Create new user
    user = User(
        username=data['username'],
        email=data['email'],
        password_digest=password_hash
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify(user.to_dict()), 201

@app.route('/api/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    
    # Hash password
    password_hash = hashlib.sha256(data['password'].encode()).hexdigest()
    
    # Find user
    user = User.query.filter_by(username=data['username'], password_digest=password_hash).first()
    
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

# Product routes
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict()), 200

# Review routes
@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews]), 200

@app.route('/api/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    
    review = Review(
        user_id=data['user_id'],
        product_id=data['product_id'],
        rating=data['rating'],
        comment=data['comment']
    )
    
    db.session.add(review)
    db.session.commit()
    
    return jsonify(review.to_dict()), 201

@app.route('/api/reviews/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.query.get_or_404(review_id)
    return jsonify(review.to_dict()), 200

@app.route('/api/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    review = Review.query.get_or_404(review_id)
    data = request.get_json()
    
    review.rating = data.get('rating', review.rating)
    review.comment = data.get('comment', review.comment)
    
    db.session.commit()
    
    return jsonify(review.to_dict()), 200

@app.route('/api/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get_or_404(review_id)
    db.session.delete(review)
    db.session.commit()
    
    return jsonify({'message': 'Review deleted successfully'}), 200

# Purchase routes
@app.route('/api/purchases', methods=['GET'])
def get_purchases():
    purchases = Purchase.query.all()
    return jsonify([purchase.to_dict() for purchase in purchases]), 200

@app.route('/api/purchases', methods=['POST'])
def create_purchase():
    data = request.get_json()
    
    purchase = Purchase(
        user_id=data['user_id'],
        product_id=data['product_id'],
        date=data.get('date', None)  # Will use default if not provided
    )
    
    db.session.add(purchase)
    db.session.commit()
    
    return jsonify(purchase.to_dict()), 201

@app.route('/api/purchases/<int:purchase_id>', methods=['GET'])
def get_purchase(purchase_id):
    purchase = Purchase.query.get_or_404(purchase_id)
    return jsonify(purchase.to_dict()), 200

@app.route('/api/purchases/<int:purchase_id>', methods=['PUT'])
def update_purchase(purchase_id):
    purchase = Purchase.query.get_or_404(purchase_id)
    data = request.get_json()
    
    purchase.date = data.get('date', purchase.date)
    
    db.session.commit()
    
    return jsonify(purchase.to_dict()), 200

@app.route('/api/purchases/<int:purchase_id>', methods=['DELETE'])
def delete_purchase(purchase_id):
    purchase = Purchase.query.get_or_404(purchase_id)
    db.session.delete(purchase)
    db.session.commit()
    
    return jsonify({'message': 'Purchase deleted successfully'}), 200

# AI analysis route
@app.route('/api/analyze', methods=['POST'])
def analyze_product():
    data = request.get_json()
    product_description = data.get('description', '')
    
    # For now, return a placeholder response
    # In the next step, we'll implement actual AI analysis
    analysis_result = {
        'description': product_description,
        'greenwashing_flags': [],
        'sustainability_score': 0,
        'recommendations': []
    }
    
    return jsonify(analysis_result), 200