require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
// 2. FIXED: Cross-Origin Requests allow karne ke liye cors settings open rakhein
app.use(cors({
    origin: '*', // Production me aap iski jagah apna Vercel Frontend URL bhi daal sakte hain
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Notes App Backend Server is Running Live! ');
});

// Routes Mount
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
