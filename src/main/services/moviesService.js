const moviesRepository = require('../repositories/moviesRepository');

const moviesService = {
  async findAll(req, res) {
    try {
      console.info('[INFO] Getting all movies');
      const movies = await moviesRepository.findAll();
      console.info('[INFO] Success getting all movies');
      res.send(movies);
    } catch (e) {
      console.error('[ERROR] Error getting all movies:', e.message);
      res.sendStatus(500);
    }
  },
};

module.exports = moviesService;
