const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://samuelkmuan:12345@cluster0.g25yoi1.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // You can handle the error as needed in your application
  }
}

// Export the MongoDB client and connection function
module.exports = { client, connectToMongoDB };
