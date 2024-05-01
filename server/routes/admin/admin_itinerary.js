const express = require('express');
const router = express.Router();
const { client, connectToMongoDB } = require('../../db/conn');
const ObjectId = require('mongodb').ObjectId;

router.post('/adminItinerary', async (req, res) => { 
    const userEmail = req.body.email; 
    
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

router.post('/admin-delete-itinerary', async (req, res) => { 
    const { itineraryID, email, firstName, reason, adminEmail } = req.body.params;
    
    try {
        await connectToMongoDB();
        const database = client.db('traveleasy');
        const collection = database.collection('itinerary');

        const itinerary = await collection.findOne({ _id: new ObjectId(itineraryID) });
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        const message_collection = database.collection('messages');
        await message_collection.insertOne({
            issued_to: itinerary.userEmail, 
            message: `Your ${itinerary.type} booking was cancelled by Admin ${firstName}!`, 
            reason: reason, 
            read: false,
            time: new Date().toLocaleString()
        });

        const log_collection = database.collection('logs');
        await log_collection.insertOne({
            by: adminEmail, 
            log_message: `Admin ${firstName} has deleted the itinerary ID: ${itineraryID}!`,
            reason: reason,
            type: 'delete',
            time: new Date().toLocaleString()
        });

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
