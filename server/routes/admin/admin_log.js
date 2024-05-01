const express = require('express');
const router = express.Router();
const { client, connectToMongoDB } = require('../../db/conn');

router.get('/admin-log', async (req, res) => { 
    try {
        await connectToMongoDB();
        const database = client.db('traveleasy');
        const collection = database.collection('logs');
        const logs = await collection.find({}).toArray();
        res.send(logs);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error.' });
    }
});

module.exports = router;