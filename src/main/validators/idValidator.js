const { param } = require('express-validator');

const validateId = [
  param('id')
    .exists()
    .withMessage('id is required')
    .isMongoId()
    .withMessage('id must have the correct format'),
];

module.exports = validateId;
