import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">SustainableShelf</h1>
          <p className="hero-tagline">Shop smarter. Live greener.</p>
          <p className="hero-description">
            Track and evaluate your product choices based on sustainability. 
            Our AI analyzes product descriptions to flag potential greenwashing 
            and recommend more sustainable alternatives.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
            <Link to="/analyze" className="btn btn-secondary">
              Analyze Product
            </Link>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <div className="container">
          <h2>Why Choose SustainableShelf?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔍 Greenwashing Detection</h3>
              <p>Our AI scans product descriptions for misleading environmental claims and vague sustainability terms.</p>
            </div>
            <div className="feature-card">
              <h3>📊 Sustainability Scores</h3>
              <p>Get clear sustainability ratings based on transparency, certifications, and environmental impact.</p>
            </div>
            <div className="feature-card">
              <h3>💡 Smart Alternatives</h3>
              <p>Discover better sustainable alternatives for products you're considering purchasing.</p>
            </div>
            <div className="feature-card">
              <h3>📈 Track Your Impact</h3>
              <p>Monitor your purchasing decisions and see how your choices contribute to a greener future.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;