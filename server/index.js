const express = require('express');
const axios = require('axios');
const { connectToMongoDB } = require('./db/conn');
const app = express();
const cors = require('cors');
const loginRoutes = require('./routes/login');
const regRoutes = require('./routes/register');
const flightRoutes = require('./routes/travelapi/flights/route.js');
const hotelRoutes = require('./routes/travelapi/hotels/route.js');

app.use(express.json());
app.use(cors());

// API routes
app.use('/api', loginRoutes);
app.use('/api', regRoutes);
app.use('/api', flightRoutes);
app.use('/api', hotelRoutes);

connectToMongoDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});