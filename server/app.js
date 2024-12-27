const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//mongoDb connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

//const blog Routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blogs', blogRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('MongoDB is connected, and Express is running!');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
