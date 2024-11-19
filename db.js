const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGODB_URI);

mongoClient.connect().then(() => {
    console.log('Connected to MongoDB successfully!');
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
});

module.exports = mongoClient;
