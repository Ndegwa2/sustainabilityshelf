# SustainableShelf

**Tagline:** Shop smarter. Live greener.

SustainableShelf is a web application that helps users track and evaluate their product choices based on sustainability. The app uses AI to analyze product descriptions, detect potential greenwashing, and recommend more sustainable alternatives.

## Features

### 🔍 Core Features
- **Greenwashing Detection**: AI-powered analysis of product descriptions to identify misleading environmental claims
- **Sustainability Scoring**: Clear ratings based on transparency, certifications, and environmental impact
- **Smart Alternatives**: Discover better sustainable alternatives for products you're considering
- **Purchase Tracking**: Monitor your purchasing decisions and environmental impact
- **Product Reviews**: Community-driven reviews and ratings

### 🧠 AI Integration
- OpenAI GPT-powered analysis for greenwashing detection
- Sustainability score calculation based on multiple factors
- Intelligent product alternative suggestions
- Natural language processing for product description analysis

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + React Router |
| State Management | React Hooks (useState, useEffect) |
| Backend | Flask + SQLAlchemy |
| Database | SQLite |
| AI | OpenAI API |
| Styling | CSS3 |
| HTTP Client | Axios |

## Project Structure

```
SustainableShelf/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── models.py           # Database models
│   ├── routes.py           # API routes
│   ├── ai_utils.py         # AI integration utilities
│   ├── seed_data.py        # Database seeding script
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Home.js & Home.css
│   │   │   ├── Products.js & Products.css
│   │   │   ├── ProductDetail.js & ProductDetail.css
│   │   │   ├── Analyze.js & Analyze.css
│   │   │   ├── MyPurchases.js & MyPurchases.css
│   │   │   ├── Login.js & Register.js
│   │   │   └── Auth.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Database Models

### User
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password_digest`

### Product
- `id` (Primary Key)
- `name`
- `brand`
- `description`
- `category`
- `sustainability_score` (0-100)

### Review
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `product_id` (Foreign Key)
- `rating` (1-5)
- `comment`
- `created_at`

### Purchase
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `product_id` (Foreign Key)
- `date`

## API Routes

### User Routes
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product

### Review Routes
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create new review
- `GET /api/reviews/:id` - Get specific review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Purchase Routes
- `GET /api/purchases` - Get all purchases
- `POST /api/purchases` - Log new purchase
- `GET /api/purchases/:id` - Get specific purchase
- `PUT /api/purchases/:id` - Update purchase
- `DELETE /api/purchases/:id` - Delete purchase

### AI Analysis Route
- `POST /api/analyze` - Analyze product for greenwashing

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- OpenAI API key

### Backend Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   SECRET_KEY=your_secret_key_here
   DATABASE_URL=sqlite:///sustainable_shelf.db
   ```

3. **Initialize the database:**
   ```bash
   python app.py
   ```

4. **Seed the database with sample data:**
   ```bash
   python seed_data.py
   ```

5. **Run the Flask server:**
   ```bash
   python app.py
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## Usage

1. **Browse Products**: View sustainable products with ratings
2. **Register/Login**: Create an account to track purchases and leave reviews
3. **Analyze Products**: Use AI to analyze any product description for greenwashing
4. **Log Purchases**: Track your buying decisions and sustainability impact
5. **Leave Reviews**: Share your experience with products
6. **View Dashboard**: Monitor your overall sustainability score

## Sustainability Scoring System

The app uses a 0-100 scoring system based on:
- **Transparency**: Clear, specific environmental claims
- **Certifications**: Presence of recognized eco-certifications
- **Verifiability**: Ability to verify sustainability claims
- **AI Analysis**: GPT-powered assessment of greenwashing indicators

### Score Ranges:
- **80-100**: Excellent sustainability
- **60-79**: Good sustainability
- **40-59**: Fair sustainability
- **0-39**: Poor sustainability

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- **Mobile App**: React Native mobile application
- **Advanced Analytics**: Detailed sustainability impact dashboards
- **Social Features**: Follow other users and share recommendations
- **Barcode Scanning**: Mobile barcode scanning for instant product analysis
- **Carbon Footprint Tracking**: Calculate and track carbon impact of purchases
- **Gamification**: Rewards and badges for sustainable choices