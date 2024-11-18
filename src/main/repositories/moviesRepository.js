const dotenv = require('dotenv');
const mongoClient = require('../../../db');

dotenv.config();
const mongoCollection = mongoClient
  .db(process.env.DB_NAME)
  .collection(process.env.DB_COLLECTION);

const moviesRepository = {
  async findAll() {
    return mongoCollection.find().toArray();
  },
};

module.exports = moviesRepository;
