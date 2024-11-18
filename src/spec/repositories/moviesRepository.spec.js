const moviesRepository = require('../../main/repositories/moviesRepository');

jest.mock('../../../db', () => ({
  db: jest.fn().mockReturnThis(),
  collection: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnValue({
    toArray: jest.fn().mockResolvedValue([
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
    ]),
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
      ]);
    });
  });
});
