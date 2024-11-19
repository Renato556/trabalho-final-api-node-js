const request = require('supertest');
const express = require('express');
const routes = require('../main/routes');
const moviesService = require('../main/services/moviesService');

jest.mock('../main/services/moviesService', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const app = express();
app.use('/', routes);

describe('Given movies routes', () => {
  let response;

  describe('When GET /', () => {
    beforeEach(async () => {
      moviesService.findAll.mockImplementation((req, res) => {
        res.sendStatus(200);
      });
      response = await request(app).get('/');
    });

    it('Then moviesService.findAll is called', () => {
      expect(moviesService.findAll).toHaveBeenCalled();
    });

    it('Then status is 200', () => {
      expect(response.status).toBe(200);
    });
  });
});
