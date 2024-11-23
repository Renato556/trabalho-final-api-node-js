const dotenv = require('dotenv');
const mongoClient = require('../../../db');
const { ObjectId } = require('mongodb');

dotenv.config();
const mongoCollection = mongoClient
  .db(process.env.DB_NAME)
  .collection(process.env.DB_COLLECTION);

const moviesRepository = {
  async findAll() {
    return mongoCollection.find().toArray();
  },

  async findById(id) {
    return mongoCollection.findOne({ _id: new ObjectId(id) });
  },

  async findByNameAndDirector(name, director) {
    return mongoCollection.findOne({
      name,
      director
    });
  },

  // async findByYear(year) {
  //   return mongoCollection.find({ releaseYear: parseInt(year, 10) }).toArray();
  // },

  async create(movieData) {
    const result = await mongoCollection.insertOne(movieData);
    return await mongoCollection.findOne({ _id: result.insertedId });
  },

  async update(id, movieData) {
    const result = await mongoCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: movieData },
      { returnOriginal: false }
    );
    return result.value;
  },

  async delete(id) {
    const result = await mongoCollection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  },
};

module.exports = moviesRepository;
