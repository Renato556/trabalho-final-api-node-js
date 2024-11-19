const moviesService = require('../../main/services/moviesService');
const moviesRepository = require('../../main/repositories/moviesRepository');

jest.mock('../../main/repositories/moviesRepository');

global.console = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

describe('Given moviesService', () => {
  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    sendStatus: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When findAll is called', () => {
    describe('And is successful', () => {
      const mockDB = [
        {
          id: '1',
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
      ];

      beforeEach(async () => {
        moviesRepository.findAll.mockResolvedValue(mockDB);
        await moviesService.findAll(req, res);
      });

      it('Then logs first info', () => {
        expect(console.info).toHaveBeenCalledWith('[INFO] Getting all movies');
      });

      it('Then moviesRepository.findAll is called', () => {
        expect(moviesRepository.findAll).toHaveBeenCalled();
      });

      it('Then logs second info', () => {
        expect(console.info).toHaveBeenCalledWith(
          '[INFO] Success getting all movies'
        );
      });

      it('Then res.send is called', () => {
        expect(res.send).toHaveBeenCalledWith(mockDB);
      });
    });

    describe('And throws an error', () => {
      beforeEach(async () => {
        moviesRepository.findAll.mockRejectedValue(
          new Error('An error occurred')
        );
        await moviesService.findAll(req, res);
      });

      it('Then logs first info', () => {
        expect(console.info).toHaveBeenCalledWith('[INFO] Getting all movies');
      });

      it('Then moviesRepository.findAll is called', () => {
        expect(moviesRepository.findAll).toHaveBeenCalled();
      });

      it('Then logs error', () => {
        expect(console.error).toHaveBeenCalledWith(
          '[ERROR] Error getting all movies:',
          'An error occurred'
        );
      });

      it('Then res.sendStatus is called', () => {
        expect(res.sendStatus).toHaveBeenCalledWith(500);
      });
    });
  });

  describe('When findById is called', () => {
    describe('And is successful', () => {
      const mockDB = {
        id: '1',
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
      };

      beforeEach(async () => {
        req.params = {
          id: '1',
        };
        moviesRepository.findById.mockResolvedValue(mockDB);
        await moviesService.findById(req, res);
      });

      it('Then logs first info', () => {
        expect(console.info).toHaveBeenCalledWith(
          '[INFO] Getting movie with id: 1'
        );
      });

      it('Then moviesRepository.findById is called', () => {
        expect(moviesRepository.findById).toHaveBeenCalledWith('1');
      });

      it('Then logs second info', () => {
        expect(console.info).toHaveBeenCalledWith(
          '[INFO] Success getting movie'
        );
      });

      it('Then res.send is called', () => {
        expect(res.send).toHaveBeenCalledWith(mockDB);
      });
    });

    describe('And is no movie is found with given ID', () => {
      beforeEach(async () => {
        req.params = {
          id: '1',
        };
        moviesRepository.findById.mockResolvedValue(null);
        await moviesService.findById(req, res);
      });

      it('Then logs first info', () => {
        expect(console.info).toHaveBeenCalledWith(
          '[INFO] Getting movie with id: 1'
        );
      });

      it('Then moviesRepository.findById is called', () => {
        expect(moviesRepository.findById).toHaveBeenCalledWith('1');
      });

      it('Then logs warn', () => {
        expect(console.warn).toHaveBeenCalledWith('[WARN] Movie not found');
      });

      it('Then res.status is called', () => {
        expect(res.status).toHaveBeenCalledWith(404);
      });

      it('Then res.send is called', () => {
        expect(res.send).toHaveBeenCalledWith({ message: 'Movie not found' });
      });
    });

    describe('And throws an error', () => {
      beforeEach(async () => {
        moviesRepository.findById.mockRejectedValue(
          new Error('An error occurred')
        );
        await moviesService.findById(req, res);
      });

      it('Then logs first info', () => {
        expect(console.info).toHaveBeenCalledWith(
          '[INFO] Getting movie with id: 1'
        );
      });

      it('Then moviesRepository.findById is called', () => {
        expect(moviesRepository.findById).toHaveBeenCalledWith('1');
      });

      it('Then logs error', () => {
        expect(console.error).toHaveBeenCalledWith(
          '[ERROR] Error getting movie:',
          'An error occurred'
        );
      });

      it('Then res.sendStatus is called', () => {
        expect(res.sendStatus).toHaveBeenCalledWith(500);
      });
    });
  });
});
