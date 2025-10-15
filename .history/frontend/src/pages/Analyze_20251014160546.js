import React, { useState } from 'react';
import axios from 'axios';
import './Analyze.css';

function Analyze() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: ''
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await axios.post('/api/analyze', formData);
      setAnalysis(response.data);
    } catch (err) {
      setError('Failed to analyze product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSustainabilityColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const getSustainabilityLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="analyze">
      <div className="container">
        <h1>AI Product Analysis</h1>
        <p>Analyze any product for greenwashing and get sustainability insights</p>

        <form onSubmit={handleSubmit} className="analyze-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Clothing">Clothing</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Beverages">Beverages</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Food">Food</option>
              <option value="Electronics">Electronics</option>
              <option value="Home & Garden">Home & Garden</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Product Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="6"
              placeholder="Paste the product description here..."
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Product'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {analysis && (
          <div className="analysis-results">
            <h2>Analysis Results</h2>
            
            <div className="score-section">
              <div className="score-display">
                <div 
                  className="score-circle"
                  style={{ backgroundColor: getSustainabilityColor(analysis.sustainability_score) }}
                >
                  <span className="score-number">{analysis.sustainability_score}</span>
                  <span className="score-max">/100</span>
                </div>
                <div className="score-info">
                  <h3>Sustainability Score</h3>
                  <p className="score-label">
                    {getSustainabilityLabel(analysis.sustainability_score)}
                  </p>
                </div>
              </div>
            </div>

            <div className="analysis-section">
              <h3>🔍 Greenwashing Analysis</h3>
              <div className="analysis-content">
                <p>{analysis.greenwashing_analysis}</p>
              </div>
            </div>

            {analysis.alternatives && (
              <div className="alternatives-section">
                <h3>💡 Sustainable Alternatives</h3>
                <div className="alternatives-content">
                  <pre>{analysis.alternatives}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Analyze;