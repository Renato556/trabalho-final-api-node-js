const express = require('express');
const routes = express.Router();

const moviesService = require('./services/moviesService');

routes.get('/', moviesService.findAll);

routes.get('/:id', moviesService.findById);

routes.post('/', moviesService.create);

routes.put('/:id', moviesService.update);

routes.delete('/:id', moviesService.delete);

module.exports = routes;
