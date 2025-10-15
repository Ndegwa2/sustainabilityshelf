import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyPurchases.css';

function MyPurchases() {
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPurchases();
    fetchProducts();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get('/api/purchases');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Filter purchases for current user
      const userPurchases = response.data.filter(purchase => purchase.user_id === user.id);
      setPurchases(userPurchases);
    } catch (err) {
      setError('Failed to fetch purchases');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      // Create a map of product id to product data
      const productMap = {};
      response.data.forEach(product => {
        productMap[product.id] = product;
      });
      setProducts(productMap);
    } catch (err) {
      console.error('Failed to fetch products');
    }
  };

  const deletePurchase = async (purchaseId) => {
    if (window.confirm('Are you sure you want to delete this purchase?')) {
      try {
        await axios.delete(`/api/purchases/${purchaseId}`);
        setPurchases(purchases.filter(purchase => purchase.id !== purchaseId));
      } catch (err) {
        alert('Failed to delete purchase');
      }
    }
  };

  const calculateTotalSustainabilityScore = () => {
    if (purchases.length === 0) return 0;
    
    const totalScore = purchases.reduce((sum, purchase) => {
      const product = products[purchase.product_id];
      return sum + (product?.sustainability_score || 0);
    }, 0);
    
    return Math.round(totalScore / purchases.length);
  };

  const getSustainabilityColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user.id) {
    return (
      <div className="my-purchases">
        <div className="container">
          <h1>My Purchases</h1>
          <p>Please login to view your purchases.</p>
        </div>
      </div>
    );
  }

  if (loading) return <div className="loading">Loading purchases...</div>;
  if (error) return <div className="error">{error}</div>;

  const averageScore = calculateTotalSustainabilityScore();

  return (
    <div className="my-purchases">
      <div className="container">
        <h1>My Purchases</h1>
        
        {purchases.length > 0 && (
          <div className="sustainability-summary">
            <div className="summary-card">
              <h3>Your Sustainability Impact</h3>
              <div className="impact-stats">
                <div className="stat">
                  <span className="stat-number">{purchases.length}</span>
                  <span className="stat-label">Total Purchases</span>
                </div>
                <div className="stat">
                  <div 
                    className="score-badge"
                    style={{ backgroundColor: getSustainabilityColor(averageScore) }}
                  >
                    {averageScore}/100
                  </div>
                  <span className="stat-label">Average Sustainability Score</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="purchases-list">
          {purchases.length === 0 ? (
            <div className="no-purchases">
              <p>You haven't logged any purchases yet.</p>
              <p>Start by browsing products and logging your purchases to track your sustainability impact!</p>
            </div>
          ) : (
            purchases.map(purchase => {
              const product = products[purchase.product_id];
              return (
                <div key={purchase.id} className="purchase-card">
                  <div className="purchase-info">
                    <h3>{product?.name || 'Unknown Product'}</h3>
                    <p className="brand">{product?.brand}</p>
                    <span className="category-tag">{product?.category}</span>
                    <p className="purchase-date">
                      Purchased on: {new Date(purchase.date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="purchase-actions">
                    <div className="sustainability-score">
                      <span 
                        className="score-badge"
                        style={{ backgroundColor: getSustainabilityColor(product?.sustainability_score || 0) }}
                      >
                        {product?.sustainability_score || 0}/100
                      </span>
                    </div>
                    <button 
                      onClick={() => deletePurchase(purchase.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPurchases;