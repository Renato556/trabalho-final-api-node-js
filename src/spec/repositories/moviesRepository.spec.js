const moviesRepository = require('../../main/repositories/moviesRepository');

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
});
