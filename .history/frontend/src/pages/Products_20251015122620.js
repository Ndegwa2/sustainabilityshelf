import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const getSustainabilityColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products">
      <div className="container">
        <h1>Sustainable Products</h1>
        <p>Browse our collection of products with sustainability ratings</p>
        
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <h3>{product.name}</h3>
                <span className="brand">{product.brand}</span>
              </div>
              
              <div className="product-category">
                <span className="category-tag">{product.category}</span>
              </div>
              
              <p className="product-description">
                {product.description.substring(0, 150)}...
              </p>
              
              <div className="product-footer">
                <div className="sustainability-score">
                  <span 
                    className="score-badge"
                    style={{ backgroundColor: getSustainabilityColor(product.sustainability_score) }}
                  >
                    {product.sustainability_score}/100
                  </span>
                  <span className="score-label">Sustainability Score</span>
                </div>
                
                <Link 
                  to={`/products/${product.id}`} 
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="no-products">
            <p>No products found. Try seeding the database with sample data.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;