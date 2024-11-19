const moviesService = require('../../main/services/moviesService');
const moviesRepository = require('../../main/repositories/moviesRepository');

jest.mock('../../main/repositories/moviesRepository');

global.console = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

describe('Given moviesService', () => {
  const req = {
    params: {
      id: '673cfac8eb496d1facf3207',
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    sendStatus: jest.fn(),
  };

  const mockDB = [
    {
      _id: '673cfac8eb496d1facf3207',
      name: 'Interestelar',
      director: 'Christopher Nolan',
      releaseYear: 2014,
      synopsis:
        'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa de garantir a sobrevivência da humanidade.',
      rating: 8.7,
      actors: [
        'Matthew McConaughey',
        'Jessica Chastain',
        'Anne Hathaway',
        'Timothée Chalamet',
      ],
      genres: ['Ficção científica', 'Aventura'],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When findAll is called', () => {
    describe('And is successful', () => {
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
      beforeEach(async () => {
        moviesRepository.findById.mockResolvedValue(mockDB);
        await moviesService.findById(req, res);
      });

      it('Then logs first info', () => {
        expect(console.info).toHaveBeenCalledWith(
          '[INFO] Getting movie with id: 673cfac8eb496d1facf3207'
        );
      });

      it('Then moviesRepository.findById is called', () => {
        expect(moviesRepository.findById).toHaveBeenCalledWith(
          '673cfac8eb496d1facf3207'
        );
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

    describe('And no movie is found with given ID', () => {
      beforeEach(async () => {
        moviesRepository.findById.mockResolvedValue(null);
        await moviesService.findById(req, res);
      });

      it('Then logs first info', () => {
        expect(console.info).toHaveBeenCalledWith(
          '[INFO] Getting movie with id: 673cfac8eb496d1facf3207'
        );
      });

      it('Then moviesRepository.findById is called', () => {
        expect(moviesRepository.findById).toHaveBeenCalledWith(
          '673cfac8eb496d1facf3207'
        );
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
          '[INFO] Getting movie with id: 673cfac8eb496d1facf3207'
        );
      });

      it('Then moviesRepository.findById is called', () => {
        expect(moviesRepository.findById).toHaveBeenCalledWith(
          '673cfac8eb496d1facf3207'
        );
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

  describe('When delete is called', () => {
    describe('And is successful', () => {
      beforeEach(async () => {
        moviesRepository.delete.mockResolvedValue(true);
        await moviesService.delete(req, res);
      });

      it('Then logs first info', () => {
        expect(console.info).toHaveBeenCalledWith(
          '[INFO] Deleting movie with id: 673cfac8eb496d1facf3207'
        );
      });

      it('Then moviesRepository.delete is called', () => {
        expect(moviesRepository.delete).toHaveBeenCalledWith(
          '673cfac8eb496d1facf3207'
        );
      });

      it('Then logs second info', () => {
        expect(console.info).toHaveBeenCalledWith(
          '[INFO] Success deleting movie'
        );
      });

      it('Then res.sendStatus is called', () => {
        expect(res.sendStatus).toHaveBeenCalledWith(204);
      });
    });

    describe('And no movie is found with given ID', () => {
      beforeEach(async () => {
        moviesRepository.delete.mockResolvedValue(false);
        await moviesService.delete(req, res);
      });

      it('Then logs first info', () => {
        expect(console.info).toHaveBeenCalledWith(
          '[INFO] Deleting movie with id: 673cfac8eb496d1facf3207'
        );
      });

      it('Then moviesRepository.delete is called', () => {
        expect(moviesRepository.delete).toHaveBeenCalledWith(
          '673cfac8eb496d1facf3207'
        );
      });

      it('Then logs warn', () => {
        expect(console.warn).toHaveBeenCalledWith(
          '[WARN] Movie not found for deletion'
        );
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
        moviesRepository.delete.mockRejectedValue(
          new Error('An error occurred')
        );
        await moviesService.delete(req, res);
      });

      it('Then logs first info', () => {
        expect(console.info).toHaveBeenCalledWith(
          '[INFO] Deleting movie with id: 673cfac8eb496d1facf3207'
        );
      });

      it('Then moviesRepository.delete is called', () => {
        expect(moviesRepository.delete).toHaveBeenCalledWith(
          '673cfac8eb496d1facf3207'
        );
      });

      it('Then logs error', () => {
        expect(console.error).toHaveBeenCalledWith(
          '[ERROR] Error deleting movie:',
          'An error occurred'
        );
      });

      it('Then res.sendStatus is called', () => {
        expect(res.sendStatus).toHaveBeenCalledWith(500);
      });
    });
  });
});
