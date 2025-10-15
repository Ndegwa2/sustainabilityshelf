import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      // Filter reviews for this product
      const productReviews = response.data.filter(review => review.product_id === parseInt(id));
      setReviews(productReviews);
    } catch (err) {
      console.error('Failed to fetch reviews');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!user.id) {
      alert('Please login to leave a review');
      return;
    }

    try {
      await axios.post('/api/reviews', {
        user_id: user.id,
        product_id: parseInt(id),
        rating: newReview.rating,
        comment: newReview.comment
      });
      
      setNewReview({ rating: 5, comment: '' });
      fetchReviews(); // Refresh reviews
    } catch (err) {
      alert('Failed to submit review');
    }
  };

  const logPurchase = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!user.id) {
      alert('Please login to log a purchase');
      return;
    }

    try {
      await axios.post('/api/purchases', {
        user_id: user.id,
        product_id: parseInt(id)
      });
      alert('Purchase logged successfully!');
    } catch (err) {
      alert('Failed to log purchase');
    }
  };

  const getSustainabilityColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-header">
          <h1>{product.name}</h1>
          <p className="brand">by {product.brand}</p>
          <span className="category-tag">{product.category}</span>
        </div>

        <div className="product-content">
          <div className="product-info">
            <div className="sustainability-score">
              <div 
                className="score-circle"
                style={{ backgroundColor: getSustainabilityColor(product.sustainability_score) }}
              >
                <span className="score-number">{product.sustainability_score}</span>
                <span className="score-max">/100</span>
              </div>
              <h3>Sustainability Score</h3>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-actions">
              <button onClick={logPurchase} className="btn btn-primary">
                Log Purchase
              </button>
            </div>
          </div>

          <div className="reviews-section">
            <h3>Reviews ({reviews.length})</h3>
            
            <form onSubmit={handleReviewSubmit} className="review-form">
              <h4>Leave a Review</h4>
              <div className="form-group">
                <label>Rating</label>
                <select 
                  value={newReview.rating} 
                  onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div className="form-group">
                <label>Comment</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Share your thoughts about this product..."
                  required
                />
              </div>
              <button type="submit" className="btn btn-secondary">Submit Review</button>
            </form>

            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="rating">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                    <span className="review-date">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;