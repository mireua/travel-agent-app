const express = require('express');
const router = express.Router();
const { client, connectToMongoDB } = require('../../db/conn');

router.post('/itinerary', async (req, res) => { 
    const userEmail = req.query.email; 
    
    try {
        await connectToMongoDB();
        const database = client.db('traveleasy');
        const collection = database.collection('itinerary');
        const itineraries = await collection.find({ userEmail }).toArray();
        res.json(itineraries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    } finally {
        await client.close();
    }
});

module.exports = router;
