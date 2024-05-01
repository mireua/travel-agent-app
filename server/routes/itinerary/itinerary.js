const express = require('express');
const router = express.Router();
const { client, connectToMongoDB } = require('../../db/conn');
const ObjectId = require('mongodb').ObjectId;

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
    }
});

router.post('/delete-itinerary', async (req, res) => { 
    const itineraryID = req.body.itineraryID;
    
    console.log('Received: ' + itineraryID);
    try {
        await connectToMongoDB();
        const database = client.db('traveleasy');
        const collection = database.collection('itinerary');

        const itinerary = await collection.findOne({ _id: new ObjectId(itineraryID) });
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        const delete_entry = await collection.deleteOne({_id: new ObjectId(itineraryID)}, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
        });

        res.json({ message: 'Itinerary item deleted successfully!' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    } finally {
        await client.close();
    }
});

module.exports = router;
