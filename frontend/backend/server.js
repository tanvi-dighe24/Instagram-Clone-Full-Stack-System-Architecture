const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Import Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// 2. Standard Middleware
app.use(cors());
app.use(express.json()); // Essential for reading JSON from requests

// 3. API Endpoints
app.use('/api/auth', authRoutes);   // For Login & Register
app.use('/api/posts', postRoutes);  // For Uploading & Liking
app.use('/api/users', userRoutes);  // For Following/Unfollowing

// 4. Root Test Route
app.get('/', (req, res) => {
    res.send('Instagram Clone API is Live and Secure.');
});

// 5. Global Error Handler (Must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});