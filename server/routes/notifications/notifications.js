const express = require('express');
const router = express.Router();
const { client, connectToMongoDB } = require('../../db/conn');

router.post('/fetch-notifications', async (req, res) => {
    const userEmail = req.body.email;
    
    await connectToMongoDB();
    const database = client.db('traveleasy');
    const notificationsCollection = database.collection('messages');

    try {
        const notifications = await notificationsCollection.find({issued_to: userEmail})
            .sort({ createdAt: -1 })
            .limit(5)
            .toArray();
            console.log(notifications);
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error while fetching notifications.' });
    }
});

router.get('/notifications-count', async (req, res) => {
    await connectToMongoDB();
    const database = client.db('traveleasy');
    const notificationsCollection = database.collection('notifications');

    try {
        const count = await notificationsCollection.countDocuments({ read: false });
        res.json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error while fetching notifications count.' });
    } finally {
        await client.close();
    }
});

module.exports = router;