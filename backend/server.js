require('dotenv').config(); 
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware - CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173', 
  'http://localhost:3000'  
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.send('Notes App Backend Server is Running Live! ');
});

// Routes Mount
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
