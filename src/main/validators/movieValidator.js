const { check } = require('express-validator');

const validateMovie = [
  check('name')
    .exists()
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string'),
  check('director')
    .exists()
    .withMessage('director is required')
    .isString()
    .withMessage('director must be a string'),
  check('releaseYear')
    .exists()
    .withMessage('releaseYear is required')
    .isInt()
    .withMessage('releaseYear must be an integer'),
  check('synopsis')
    .exists()
    .withMessage('synopsis is required')
    .isString()
    .withMessage('synopsis must be a string'),
  check('rating')
    .exists()
    .withMessage('rating is required')
    .isFloat()
    .withMessage('rating must be a number'),
  check('actors')
    .exists()
    .withMessage('actors list is required')
    .isArray()
    .withMessage('actors must be an array of strings'),
  check('genres')
    .exists()
    .withMessage('genres list is required')
    .isArray()
    .withMessage('genres must be an array of strings'),
];

module.exports = validateMovie;
