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
          'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa de garantir a sobrevivência da humanidade.',
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
      'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa de garantir a sobrevivência da humanidade.',
    anoLancamento: 2014,
    genero: ['Ficção científica', 'Aventura'],
  }),
}));

jest.mock('../../main/repositories/moviesRepository', () => ({
  findAll: jest.fn().mockResolvedValue([
    {
      _id: '673c847c6156c4908a2aa5fc',
      nome: 'Interestelar',
      atores: ['Matthew McConaughey', 'Jessica Chastain', 'Anne Hathaway', 'Timothée Chalamet'],
      descricao: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa de garantir a sobrevivência da humanidade.',
      anoLancamento: 2014,
      genero: ['Ficção científica', 'Aventura'],
    },
  ]),
  findById: jest.fn().mockResolvedValue({
    _id: '673c847c6156c4908a2aa5fc',
    nome: 'Interestelar',
    atores: ['Matthew McConaughey', 'Jessica Chastain', 'Anne Hathaway', 'Timothée Chalamet'],
    descricao: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa de garantir a sobrevivência da humanidade.',
    anoLancamento: 2014,
    genero: ['Ficção científica', 'Aventura'],
  }),
  findByNameAndDirector: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
}));

describe('Given moviesRepository', () => {
  describe('When findAll is called', () => {
    let result;
    beforeEach(async () => {
      result = await moviesRepository.findAll();
    });

    it('Then returns all movies in DB', () => {
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
            'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa de garantir a sobrevivência da humanidade.',
          anoLancamento: 2014,
          genero: ['Ficção científica', 'Aventura'],
        },
      ]);
    });
  });

  describe('When findById is called', () => {
    let result;
    beforeEach(async () => {
      result = await moviesRepository.findById('673c847c6156c4908a2aa5fc');
    });

    it('Then returns the movie with the given ID', () => {
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
          'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa de garantir a sobrevivência da humanidade.',
        anoLancamento: 2014,
        genero: ['Ficção científica', 'Aventura'],
      });
    });
  });

  describe('When create is called in moviesService', () => {
    const req = {
      body: {
        name: 'Interestelar',
        director: 'Christopher Nolan',
        releaseYear: 2014,
        synopsis: 'Uma equipe de exploradores viaja através de um buraco de minhoca...',
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

    describe('When the movie already exists in the database', () => {
      it('Then it returns a 409 error', async () => {
    
        moviesRepository.findByNameAndDirector.mockResolvedValue({
          _id: '673c847c6156c4908a2aa5fc',
          name: 'Interestelar',
          director: 'Christopher Nolan',
        });

        await moviesService.create(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.send).toHaveBeenCalledWith({ message: 'Movie already exists' });
      });
    });

    describe('When the movie does not exist in the database', () => {
      it('Then it creates the movie and returns the created movie', async () => {
       
        moviesRepository.findByNameAndDirector.mockResolvedValue(null);
        moviesRepository.create.mockResolvedValue(new MovieDTO(req.body));

        await moviesService.create(req, res);

        expect(moviesRepository.findByNameAndDirector).toHaveBeenCalledWith(
          req.body.name,
          req.body.director
        );
        expect(moviesRepository.create).toHaveBeenCalledWith(expect.any(MovieDTO));
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining(req.body));
      });
    });
  });

  describe('When delete is called in moviesService', () => {
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

    describe('When the movie exists and is deleted successfully', () => {
      it('Then it deletes the movie and returns a 204 status', async () => {
       
        moviesRepository.delete.mockResolvedValue(true);

        await moviesService.delete(req, res);

        expect(moviesRepository.delete).toHaveBeenCalledWith(req.params.id);
        expect(res.sendStatus).toHaveBeenCalledWith(204);
      });
    });

    describe('When the movie does not exist for deletion', () => {
      it('Then it returns a 404 error', async () => {
       
        moviesRepository.delete.mockResolvedValue(false);

        await moviesService.delete(req, res);

        expect(moviesRepository.delete).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ message: 'Movie not found' });
      });
    });

    describe('When an error occurs during deletion', () => {
      it('Then it returns a 500 error', async () => {
     
        const errorMessage = 'Database connection failed';
        moviesRepository.delete.mockRejectedValue(new Error(errorMessage));

        await moviesService.delete(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(500);
      });
    });
  });
});
