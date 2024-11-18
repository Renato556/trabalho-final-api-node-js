const moviesService = require('../../main/services/moviesService');
const moviesRepository = require('../../main/repositories/moviesRepository');

jest.mock('../../main/repositories/moviesRepository');

global.console = {
  info: jest.fn(),
  error: jest.fn(),
};

describe('Given moviesService', () => {
  const req = {};
  const res = {
    send: jest.fn(),
    sendStatus: jest.fn(),
  };

  describe('When findAll is called', () => {
    describe('And is successful', () => {
      const mockDB = [
        {
          id: 1,
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
});
