const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.warn(
      '[WARN] Request rejected. Failed validations: ',
      errors.array()
    );
    return res.status(422).send({ errors: errors.array() });
  }

  next();
};

module.exports = validateRequest;
