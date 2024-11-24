const moviesRepository = require('../../main/repositories/moviesRepository');
const moviesService = require('../../main/services/moviesService');
const MovieDTO = require('../../main/dtos/movieDTO');

jest.mock('../../../db', () => ({
  db: jest.fn().mockReturnThis(),
  collection: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnValue({
    toArray: jest.fn().mockResolvedValue([
      {
        _id: '673c847c6156c4908a2aa5fc',
        nome: 'Interestelar',
        atores: [
          'Matthew McConaughey',
          'Jessica Chastain',
          'Anne Hathaway',
          'Timothée Chalamet',
        ],
        descricao:
          'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço...',
        anoLancamento: 2014,
        genero: ['Ficção científica', 'Aventura'],
      },
    ]),
  }),
  findOne: jest.fn().mockReturnValue({
    _id: '673c847c6156c4908a2aa5fc',
    nome: 'Interestelar',
    atores: [
      'Matthew McConaughey',
      'Jessica Chastain',
      'Anne Hathaway',
      'Timothée Chalamet',
    ],
    descricao:
      'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço...',
    anoLancamento: 2014,
    genero: ['Ficção científica', 'Aventura'],
  }),
}));

jest.mock('../../main/repositories/moviesRepository', () => ({
  findAll: jest.fn().mockResolvedValue([
    {
      _id: '673c847c6156c4908a2aa5fc',
      nome: 'Interestelar',
      atores: [
        'Matthew McConaughey',
        'Jessica Chastain',
        'Anne Hathaway',
        'Timothée Chalamet',
      ],
      descricao:
        'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço...',
      anoLancamento: 2014,
      genero: ['Ficção científica', 'Aventura'],
    },
  ]),
  findById: jest.fn().mockResolvedValue({
    _id: '673c847c6156c4908a2aa5fc',
    nome: 'Interestelar',
    atores: [
      'Matthew McConaughey',
      'Jessica Chastain',
      'Anne Hathaway',
      'Timothée Chalamet',
    ],
    descricao:
      'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço...',
    anoLancamento: 2014,
    genero: ['Ficção científica', 'Aventura'],
  }),
  findByNameAndDirector: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
}));

describe('Movies Repository and Service', () => {
  describe('findAll', () => {
    it('should return all movies in DB', async () => {
      const result = await moviesRepository.findAll();
      expect(result).toEqual([
        {
          _id: '673c847c6156c4908a2aa5fc',
          nome: 'Interestelar',
          atores: [
            'Matthew McConaughey',
            'Jessica Chastain',
            'Anne Hathaway',
            'Timothée Chalamet',
          ],
          descricao:
            'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço...',
          anoLancamento: 2014,
          genero: ['Ficção científica', 'Aventura'],
        },
      ]);
    });
  });

  describe('findById', () => {
    it('should return the movie with the given ID', async () => {
      const result = await moviesRepository.findById(
        '673c847c6156c4908a2aa5fc'
      );
      expect(result).toEqual({
        _id: '673c847c6156c4908a2aa5fc',
        nome: 'Interestelar',
        atores: [
          'Matthew McConaughey',
          'Jessica Chastain',
          'Anne Hathaway',
          'Timothée Chalamet',
        ],
        descricao:
          'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço...',
        anoLancamento: 2014,
        genero: ['Ficção científica', 'Aventura'],
      });
    });
  });

  describe('create', () => {
    const req = {
      body: {
        name: 'Interestelar',
        director: 'Christopher Nolan',
        releaseYear: 2014,
        synopsis:
          'Uma equipe de exploradores viaja através de um buraco de minhoca...',
        rating: 8.6,
        actors: ['Matthew McConaughey', 'Jessica Chastain', 'Anne Hathaway'],
        genres: ['Ficção científica', 'Aventura'],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return a 409 error if the movie already exists', async () => {
      moviesRepository.findByNameAndDirector.mockResolvedValue({
        _id: '673c847c6156c4908a2aa5fc',
        name: 'Interestelar',
        director: 'Christopher Nolan',
      });
      await moviesService.create(req, res);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Movie already exists',
      });
    });

    it('should create the movie and return it', async () => {
      moviesRepository.findByNameAndDirector.mockResolvedValue(null);
      moviesRepository.create.mockResolvedValue(new MovieDTO(req.body));
      await moviesService.create(req, res);
      expect(moviesRepository.create).toHaveBeenCalledWith(
        expect.any(MovieDTO)
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining(req.body));
    });
  });

  describe('delete', () => {
    const req = {
      params: { id: '673c847c6156c4908a2aa5fc' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      sendStatus: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should delete the movie successfully', async () => {
      moviesRepository.delete.mockResolvedValue(true);
      await moviesService.delete(req, res);
      expect(moviesRepository.delete).toHaveBeenCalledWith(req.params.id);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it('should return 404 if the movie is not found', async () => {
      moviesRepository.delete.mockResolvedValue(false);
      await moviesService.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Movie not found' });
    });

    it('should return 500 if there is an error', async () => {
      moviesRepository.delete.mockRejectedValue(new Error('DB Error'));
      await moviesService.delete(req, res);
      expect(res.sendStatus).toHaveBeenCalledWith(500);
    });
  });
});
