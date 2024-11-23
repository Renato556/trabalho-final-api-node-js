const express = require('express');
const routes = express.Router();

const movieValidator = require('./validators/movieValidator');
const idValidator = require('./validators/idValidator');
const validateRequest = require('./middlewares/validateRequest');

const moviesService = require('../main/services/moviesService');

routes.get('/', moviesService.findAll);
routes.get('/:id', idValidator, validateRequest, moviesService.findById);
routes.post('/', movieValidator, validateRequest, moviesService.create);
routes.put('/:id', idValidator, validateRequest, moviesService.update);
routes.delete('/:id', idValidator, validateRequest, moviesService.delete);
// routes.get('/year/:year', moviesService.findByYear);

module.exports = routes;
