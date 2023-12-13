const express = require('express');
const axios = require('axios');
const { connectToMongoDB } = require('./db/conn');
const app = express();
const cors = require('cors');
const loginRoutes = require('./routes/login');
const regRoutes = require('./routes/register');
const fetchData = require('./routes/travelapi/travelapi'); // Update the path accordingly

app.use(express.json());
app.use(cors());

// API routes
app.use('/api', loginRoutes);
app.use('/api', regRoutes);

// Example route using fetchData
app.get('/api/travelapi', async (req, res) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

connectToMongoDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});