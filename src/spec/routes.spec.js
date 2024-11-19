const request = require('supertest');
const express = require('express');
const routes = require('../main/routes');
const moviesService = require('../main/services/moviesService');
const validateRequest = require('../main/middlewares/validateRequest');

jest.mock('../main/services/moviesService', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));
jest.mock('../main/middlewares/validateRequest', () =>
  jest.fn().mockImplementation((req, res, next) => {
    next();
  })
);

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

  describe('When GET /id', () => {
    beforeEach(async () => {
      moviesService.findById.mockImplementation((req, res) => {
        res.sendStatus(200);
      });
      response = await request(app).get('/673cfac8eb496d1facf32077');
    });

    it('ThenvalidateRequest middleware is called', () => {
      expect(validateRequest).toHaveBeenCalled();
    });

    it('Then moviesService.findAll is called', () => {
      expect(moviesService.findById).toHaveBeenCalled();
    });

    it('Then status is 200', () => {
      expect(response.status).toBe(200);
    });
  });

  describe('When POST /', () => {
    beforeEach(async () => {
      moviesService.create.mockImplementation((req, res) => {
        res.sendStatus(201);
      });
      response = await request(app).post('/');
    });

    it('ThenvalidateRequest middleware is called', () => {
      expect(validateRequest).toHaveBeenCalled();
    });

    it('Then moviesService.create is called', () => {
      expect(moviesService.create).toHaveBeenCalled();
    });

    it('Then status is 201', () => {
      expect(response.status).toBe(201);
    });
  });

  describe('When PUT /id', () => {
    beforeEach(async () => {
      moviesService.update.mockImplementation((req, res) => {
        res.sendStatus(200);
      });
      response = await request(app).put('/673cfac8eb496d1facf32077');
    });

    it('ThenvalidateRequest middleware is called', () => {
      expect(validateRequest).toHaveBeenCalled();
    });

    it('Then moviesService.update is called', () => {
      expect(moviesService.update).toHaveBeenCalled();
    });

    it('Then status is 200', () => {
      expect(response.status).toBe(200);
    });
  });

  describe('When DELETE /id', () => {
    beforeEach(async () => {
      moviesService.delete.mockImplementation((req, res) => {
        res.sendStatus(204);
      });
      response = await request(app).delete('/673cfac8eb496d1facf32077');
    });

    it('ThenvalidateRequest middleware is called', () => {
      expect(validateRequest).toHaveBeenCalled();
    });

    it('Then moviesService.delete is called', () => {
      expect(moviesService.delete).toHaveBeenCalled();
    });

    it('Then status is 204', () => {
      expect(response.status).toBe(204);
    });
  });
});
