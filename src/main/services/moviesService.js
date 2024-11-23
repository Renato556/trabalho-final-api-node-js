const moviesRepository = require('../repositories/moviesRepository');
const MovieDTO = require('../dtos/movieDTO');

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

  async findById(req, res) {
    try {
      console.info(`[INFO] Getting movie with id: ${req.params.id}`);
      const movie = await moviesRepository.findById(req.params.id);
      if (!movie) {
        console.warn('[WARN] Movie not found');
        return res.status(404).send({ message: 'Movie not found' });
      }
      console.info('[INFO] Success getting movie');
      res.send(movie);
    } catch (e) {
      console.error('[ERROR] Error getting movie:', e.message);
      res.sendStatus(500);
    }
  },

  async findByYear(req, res) {
    try {
      const { year } = req.params;
      console.info(`[INFO] Getting movies from year: ${year}`);
      const movies = await moviesRepository.findByYear(year);

      if (!movies.length) {
        console.warn('[WARN] No movies found for the given year');
        return res.status(404).send({ message: 'No movies found for the given year' });
      }

      console.info('[INFO] Success getting movies by year');
      res.status(200).send(movies);
    } catch (e) {
      console.error('[ERROR] Error getting movies by year:', e.message);
      res.sendStatus(500);
    }
  },

  async create(req, res) {
    // verificação de existência de um filme com mesmo nome e diretor (409)
    try {
      console.info('[INFO] Creating a new movie');
      const existingMovie = await moviesRepository.findByNameAndDirector(
        req.body.name,
        req.body.director
      );
      if (existingMovie) {
        console.warn('[WARN] Movie already exists');
        return res.status(409).send({ message: 'Movie already exists'});
      }
      const movie = await moviesRepository.create(new MovieDTO(req.body));
      console.info('[INFO] Success creating movie');
      res.status(201).send(movie);
    } catch (e) {
      console.error('[ERROR] Error creating movie:', e.message);
      res.sendStatus(500);
    }
  },

  async update(req, res) {
    try {
      console.info(`[INFO] Updating movie with id: ${req.params.id}`);
      // acredito que precisamos verificar se existe um filme com o ID antes de tentar atualizar, não consegui fazer cair no cenário de 404
      const updatedMovie = await moviesRepository.update(
        req.params.id,
        req.body
      );
      if (!updatedMovie) {
        console.warn('[WARN] Movie not found for update');
        return res.status(404).send({ message: 'Movie not found' });
      }
      console.info('[INFO] Success updating movie');
      res.send(updatedMovie);
    } catch (e) {
      console.error('[ERROR] Error updating movie:', e.message);
      res.sendStatus(500);
    }
  },

  async delete(req, res) {
    try {
      console.info(`[INFO] Deleting movie with id: ${req.params.id}`);
      const deleted = await moviesRepository.delete(req.params.id);
      if (!deleted) {
        console.warn('[WARN] Movie not found for deletion');
        return res.status(404).send({ message: 'Movie not found' });
      }
      console.info('[INFO] Success deleting movie');
      res.sendStatus(204);
    } catch (e) {
      console.error('[ERROR] Error deleting movie:', e.message);
      res.sendStatus(500);
    }
  },
};

module.exports = moviesService;
