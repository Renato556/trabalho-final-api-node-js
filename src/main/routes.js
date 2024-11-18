const express = require('express');
const routes = express.Router();

const moviesService = require('./services/moviesService');

routes.get('/', moviesService.findAll);

module.exports = routes;
