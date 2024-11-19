class MovieDTO {
  name;
  director;
  releaseYear;
  synopsis;
  rating;
  actors;
  genres;

  constructor(data) {
    this.name = data.name;
    this.director = data.director;
    this.releaseYear = data.releaseYear;
    this.synopsis = data.synopsis;
    this.rating = data.rating;
    this.actors = data.actors;
    this.genres = data.genres;
  }
}

module.exports = MovieDTO;
