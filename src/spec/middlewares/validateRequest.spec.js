const { validationResult } = require('express-validator');
const validateRequest = require('../../main/middlewares/validateRequest');

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

global.console = {
  warn: jest.fn(),
};

describe('Given validateRequest', () => {
  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When middleware is called with violations', () => {
    beforeEach(async () => {
      validationResult.mockReturnValue({
        isEmpty: jest.fn().mockReturnValue(false),
        array: jest.fn().mockReturnValue([{ errors: 'Validation failed' }]),
      });

      await validateRequest(req, res, next);
    });

    it('Then validationResult is called', () => {
      expect(validationResult).toHaveBeenCalledWith(req);
    });

    it('Then res.status is called', () => {
      expect(res.status).toHaveBeenCalledWith(422);
    });

    it('Then res.send is called', () => {
      expect(res.send).toHaveBeenCalledWith({
        errors: [{ errors: 'Validation failed' }],
      });
    });

    it('Then next is NOT called', () => {
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('When middleware is called without violations', () => {
    beforeEach(async () => {
      validationResult.mockReturnValue({
        isEmpty: jest.fn().mockReturnValueOnce(true),
      });

      await validateRequest(req, res, next);
    });

    it('Then validationResult is called', () => {
      expect(validationResult).toHaveBeenCalledWith(req);
    });

    it('Then next is called', () => {
      expect(next).toHaveBeenCalled();
    });
  });
});
