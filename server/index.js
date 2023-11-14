const express = require('express');
const { connectToMongoDB } = require('./db/conn');
const app = express()
const cors = require('cors');
const loginRoutes = require('./routes/login');
const regRoutes = require('./routes/register');

app.use(express.json());
app.use(cors());

app.use('/api', loginRoutes);
app.use('/api', regRoutes);

connectToMongoDB()

app.listen(5000, () => {
  console.log(`Server is running on port 5000!`);
});