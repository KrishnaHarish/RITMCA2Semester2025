# Crop Yield Prediction System

A comprehensive web application built with Node.js, Express, and MongoDB for predicting crop yields using environmental and agricultural data.

## 🚀 Features

### Core Capabilities
- **Yield Prediction**: AI-powered crop yield prediction using multiple environmental factors
- **Crop Management**: Complete CRUD operations for crop data management
- **Analytics Dashboard**: Comprehensive statistics and insights
- **Historical Comparison**: Compare predictions with historical data
- **Smart Recommendations**: Actionable advice for crop optimization
- **Multi-factor Analysis**: Considers rainfall, temperature, soil, fertilizer, and location data

### Supported Crop Types
- Rice, Wheat, Corn, Barley, Soybeans
- Cotton, Sugarcane, Potato, Tomato
- Extensible for additional crops

### Prediction Factors
- **Climate Data**: Rainfall, temperature (min/max/average), humidity
- **Soil Information**: Type, pH level
- **Agricultural Inputs**: Fertilizer composition (N-P-K + organic)
- **Geographic Data**: State, district, coordinates (optional)
- **Temporal Data**: Season (Kharif/Rabi/Zaid/Whole Year)

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crop-yield-prediction
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/crop_yield_prediction
   PORT=3000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Start the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
crop-yield-prediction/
├── controllers/          # Business logic controllers
│   ├── cropController.js      # Crop CRUD operations
│   └── predictionController.js # Prediction algorithms
├── models/              # MongoDB models
│   └── Crop.js               # Crop data schema
├── routes/              # API routes
│   ├── cropRoutes.js         # Crop management routes
│   └── predictionRoutes.js   # Prediction routes
├── middleware/          # Custom middleware
│   └── errorHandler.js       # Error handling middleware
├── public/              # Static files
│   └── index.html           # Frontend interface
├── utils/               # Utility functions
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies
├── server.js           # Application entry point
└── README.md           # This file
```

## 🔌 API Endpoints

### Crop Management

#### GET /api/v1/crops
Get all crops with filtering and pagination.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `cropType` (string): Filter by crop type
- `season` (string): Filter by season
- `state` (string): Filter by state
- `district` (string): Filter by district
- `sortBy` (string): Sort field (default: createdAt)
- `sortOrder` (string): Sort order (asc/desc, default: desc)

**Example:**
```bash
GET /api/v1/crops?page=1&limit=10&cropType=Rice&season=Kharif
```

#### GET /api/v1/crops/:id
Get specific crop by ID.

#### POST /api/v1/crops
Create new crop record.

**Request Body:**
```json
{
  "cropType": "Rice",
  "season": "Kharif",
  "area": 5.5,
  "rainfall": 1200,
  "temperature": {
    "average": 28,
    "min": 22,
    "max": 35
  },
  "humidity": 75,
  "fertilizer": {
    "nitrogen": 120,
    "phosphorus": 60,
    "potassium": 40,
    "organic": 500
  },
  "soilType": "Alluvial",
  "pH": 6.5,
  "location": {
    "state": "Punjab",
    "district": "Ludhiana"
  },
  "plantingDate": "2024-06-15",
  "harvestDate": "2024-11-20",
  "actualYield": 6.2,
  "notes": "Good growing conditions"
}
```

#### PUT /api/v1/crops/:id
Update existing crop record.

#### DELETE /api/v1/crops/:id
Delete crop record.

#### GET /api/v1/crops/statistics
Get crop statistics and analytics.

### Yield Prediction

#### POST /api/v1/predictions/yield
Predict crop yield based on input parameters.

**Request Body:**
```json
{
  "cropType": "Wheat",
  "season": "Rabi",
  "area": 10,
  "rainfall": 450,
  "temperature": {
    "average": 20,
    "min": 12,
    "max": 28
  },
  "humidity": 65,
  "fertilizer": {
    "nitrogen": 100,
    "phosphorus": 50,
    "potassium": 30,
    "organic": 300
  },
  "soilType": "Loamy",
  "pH": 7.0,
  "location": {
    "state": "Haryana",
    "district": "Karnal"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "predictedYield": 4.8,
    "unit": "tons per hectare",
    "totalProduction": 48.0,
    "confidenceScore": 85,
    "historicalComparison": {
      "averageYield": 4.5,
      "recordCount": 15,
      "yieldRange": { "min": 3.2, "max": 6.1 }
    },
    "recommendations": [...],
    "methodology": "Multi-factor regression model..."
  }
}
```

#### GET /api/v1/predictions/analytics
Get yield trends and analytics.

## 🧮 Prediction Algorithm

The system uses a multi-factor regression model that considers:

### Base Yield Calculation
Each crop has a baseline yield potential based on optimal conditions.

### Environmental Factors

1. **Rainfall Factor**
   - Compares actual rainfall to optimal range for the crop
   - Applies penalties for too little or too much water

2. **Temperature Factor**
   - Evaluates average temperature against crop-specific optimal ranges
   - Considers heat/cold stress impacts

3. **Fertilizer Factor**
   - Calculates total nutrient input (N-P-K + organic)
   - Applies diminishing returns for over-fertilization

4. **Soil Factor**
   - Different soil types have varying productivity multipliers
   - Considers soil-crop compatibility

### Final Calculation
```
Predicted Yield = Base Yield × Rainfall Factor × Temperature Factor × Fertilizer Factor × Soil Factor
```

### Confidence Scoring
- Historical data availability: +20% confidence
- Optimal growing conditions: +20% confidence
- Base confidence: 50%
- Minimum confidence: 30%, Maximum: 95%

## 🎯 Usage Examples

### 1. Predicting Rice Yield
```javascript
const predictionData = {
  cropType: "Rice",
  season: "Kharif",
  area: 2.5,
  rainfall: 1400,
  temperature: { average: 29, min: 24, max: 34 },
  humidity: 80,
  soilType: "Clay",
  pH: 6.0,
  fertilizer: { nitrogen: 80, phosphorus: 40, potassium: 20, organic: 800 },
  location: { state: "West Bengal", district: "Bardhaman" }
};

// API call
fetch('/api/v1/predictions/yield', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(predictionData)
});
```

### 2. Adding Crop Record
```javascript
const cropData = {
  ...predictionData,
  plantingDate: "2024-06-01",
  harvestDate: "2024-11-15",
  actualYield: 5.8
};

fetch('/api/v1/crops', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(cropData)
});
```

## 🧪 Testing

### Manual Testing
1. Start the application: `npm run dev`
2. Open `http://localhost:3000`
3. Test yield prediction with sample data
4. Add crop records and verify CRUD operations
5. Check analytics and statistics

### API Testing with curl
```bash
# Health check
curl http://localhost:3000/health

# Predict yield
curl -X POST http://localhost:3000/api/v1/predictions/yield \
  -H "Content-Type: application/json" \
  -d '{"cropType":"Rice","season":"Kharif","area":1,"rainfall":1200,...}'

# Get crops
curl http://localhost:3000/api/v1/crops

# Get statistics
curl http://localhost:3000/api/v1/crops/statistics
```

## 🚀 Deployment

### Local Deployment
1. Set `NODE_ENV=production` in `.env`
2. Use production MongoDB URI
3. Start with `npm start`

### Cloud Deployment
1. **MongoDB Atlas**: Use cloud MongoDB service
2. **Heroku/Railway**: Deploy Node.js application
3. **Environment Variables**: Set production configuration

Example for Heroku:
```bash
heroku create crop-yield-app
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set NODE_ENV=production
git push heroku main
```

## 📈 Scaling Considerations

### Performance Optimization
- Add database indexing for frequently queried fields
- Implement caching with Redis
- Use connection pooling for MongoDB
- Add request rate limiting

### Data Management
- Implement data archiving for old records
- Add data validation middleware
- Consider data backup strategies
- Implement audit logging

### Machine Learning Enhancement
- Replace simple regression with ML models
- Add weather API integration
- Implement seasonal learning
- Add crop disease prediction

## 🔧 Configuration Options

### Environment Variables
```env
# Database
MONGODB_URI=mongodb://localhost:27017/crop_yield_prediction
DB_NAME=crop_yield_prediction

# Server
PORT=3000
NODE_ENV=development

# Security
JWT_SECRET=your_secret_key

# External APIs (future)
WEATHER_API_KEY=your_weather_api_key
```

### Model Parameters
Adjust crop-specific parameters in `models/Crop.js`:
- Base yield values
- Optimal rainfall ranges
- Temperature ranges
- Soil type multipliers

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common problems

## 🔮 Roadmap

### Version 2.0 Features
- [ ] Machine Learning model integration
- [ ] Weather API integration
- [ ] Mobile application
- [ ] Real-time monitoring dashboard
- [ ] Crop disease prediction
- [ ] Market price integration
- [ ] Multi-language support
- [ ] Advanced analytics and reporting

---

Built with ❤️ for sustainable agriculture and better crop management.