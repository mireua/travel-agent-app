const express = require('express');
const router = express.Router();
const { client, connectToMongoDB } = require('../../db/conn');

router.post('/admin-load-users', async (req, res) => { 
    try {
        await connectToMongoDB();
        const database = client.db('traveleasy');
        const collection = database.collection('users');
        const users = await collection.find({}).toArray();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post('/admin-delete-user', async (req, res) => { 
    const { email, reason, adminEmail, firstName } = req.body;
    
    try {
        await connectToMongoDB();
        const database = client.db('traveleasy');
        const collection = database.collection('users');

        const users = await collection.findOne({ email: email });
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }

        const log_collection = database.collection('logs');
        await log_collection.insertOne({
            by: adminEmail, 
            log_message: `Admin ${firstName} has deleted the e-mail: ${users.email}! NOTE: All of the users itinerary have been deleted!`,
            reason: reason,
            type: 'delete',
            time: new Date().toLocaleString()
        });

        const delete_entry = await collection.deleteOne({ email: email });

        res.json({ message: 'User deleted successfully!' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    } finally {
        await client.close();
    }
});

router.post('/admin-edit-user', async (req, res) => {
    const { email, updatedDetails, adminEmail, firstName } = req.body;
    
    try {
        await connectToMongoDB();
        const database = client.db('traveleasy');
        const collection = database.collection('users');

        const user = await collection.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const update_result = await collection.updateOne(
            { email: email }, 
            { $set: updatedDetails }
        );

        const log_collection = database.collection('logs');
        await log_collection.insertOne({
            by: adminEmail, 
            log_message: `Admin ${firstName} edited the details for email: ${email}. Changes: ${JSON.stringify(updatedDetails)}`,
            type: 'edit',
            time: new Date().toLocaleString()
        });

        res.json({ message: 'User updated successfully!' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post('/admin-promote-user', async (req, res) => {
    const { email, adminEmail } = req.body;
    
    try {
        await connectToMongoDB();
        const database = client.db('traveleasy');
        const usersCollection = database.collection('users');
        const logsCollection = database.collection('logs');

        const userToUpdate = await usersCollection.findOne({ email: email });
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (userToUpdate.role === 'admin') {
            return res.status(400).json({ message: 'User is already an admin' });
        }

        await usersCollection.updateOne(
            { email: email },
            { $set: { role: 'admin' } }
        );

       
        await logsCollection.insertOne({
            by: adminEmail,
            log_message: `User ${email} was promoted to admin by ${adminEmail}`,
            type: 'promotion',
            time: new Date().toLocaleString()  
        });

        const message_collection = database.collection('messages');
        await message_collection.insertOne({
            issued_to: email, 
            message: `You were promoted to a Admin, congratulations!`,  
            read: false,
            time: new Date().toLocaleString()
        });

        res.json({ message: 'User promoted to admin successfully!' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }

    router.post('/admin-demote-user', async (req, res) => {
        const { email, adminEmail } = req.body;
    
        await connectToMongoDB();
        const database = client.db('traveleasy');
        const usersCollection = database.collection('users');
        const logsCollection = database.collection('logs');
    
        const userToUpdate = await usersCollection.findOne({ email: email });
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        if (userToUpdate.role === 'user') {
            return res.status(400).json({ message: 'User is already a regular user' });
        }
    
        await usersCollection.updateOne(
            { email: email },
            { $set: { role: 'user' } }
        );
    
        await logsCollection.insertOne({
            by: adminEmail,
            log_message: `User ${email} was demoted to regular user by ${adminEmail}`,
            type: 'demotion',
            time: new Date().toISOString()
        });

        const message_collection = database.collection('messages');
        await message_collection.insertOne({
            issued_to: email, 
            message: `You were demoted to a user. :(`,  
            read: false,
            time: new Date().toLocaleString()
        });
    
        res.json({ message: 'User demoted to regular user successfully!' });
    });
});

module.exports = router;
