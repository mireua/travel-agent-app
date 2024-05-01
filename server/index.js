const express = require('express');
const axios = require('axios');
const { connectToMongoDB } = require('./db/conn');
const app = express();
const cors = require('cors');
const loginRoutes = require('./routes/login/login.js');
const regRoutes = require('./routes/login/register.js');
const flightRoutes = require('./routes/travelapi/flights/route.js');
const hotelRoutes = require('./routes/travelapi/hotels/route.js');
const attractionRoutes = require('./routes/travelapi/attractions/route.js');
const bookFlight = require('./routes/checkout/booking.js');
const bookHotel = require('./routes/checkout/hotels.js');
const itinerary = require('./routes/itinerary/itinerary.js');
const adminItinerary = require('./routes/admin/admin_itinerary.js');
const adminUsers = require('./routes/admin/admin_users.js');
const notifications = require('./routes/notifications/notifications.js');

app.use(express.json());
app.use(cors());

// API routes
app.use('/api', loginRoutes);
app.use('/api', regRoutes);
app.use('/api', flightRoutes);
app.use('/api', hotelRoutes);
app.use('/api', attractionRoutes);
app.use('/api', bookFlight);
app.use('/api', bookHotel);
app.use('/api', itinerary);
app.use('/api', adminItinerary);
app.use('/api', adminUsers);
app.use('/api', notifications);


connectToMongoDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});