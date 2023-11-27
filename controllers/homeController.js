const db = require('../models/db');

const getHomePage = async (req, res) => {
  try {
    const [topRatedMovies] = await db.query('SELECT * FROM movies ORDER BY rating DESC LIMIT 5');
    const [topBoxOfficeMovies] = await db.query('SELECT * FROM movies ORDER BY box_office DESC LIMIT 30');
    const [topFavoriteMovies] = await db.query('SELECT * FROM movies WHERE favorite=true LIMIT 30');

    res.render('home', {
      topRatedMovies,
      topBoxOfficeMovies,
      topFavoriteMovies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const movieId = req.params.id;
    const [movieDetails] = await db.query('SELECT * FROM movies WHERE id = ?', [movieId]);

    if (movieDetails.length === 0) {
      return res.status(404).send('Movie not found');
    }

    res.render('movie-details', { movieDetails });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const searchMovies = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const [searchResults] = await db.query('SELECT * FROM movies WHERE title LIKE ?', [`%${searchTerm}%`]);

    res.render('search-results', { searchResults, searchTerm });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getHomePage,
  getMovieDetails,
  searchMovies,
};
