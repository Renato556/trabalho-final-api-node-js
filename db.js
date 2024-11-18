const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGODB_URI);

module.exports = mongoClient;
