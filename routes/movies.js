var express = require('express');
var router = express.Router();
const authMiddleware = require("../middleware/auth"); // middleware 
const { getAllMovies, getMovie, updateMovie, createMovie, removeMovie } = require("../controllers/moviesController")

/* GET all Movies. */
router.route('/')
  .get(getAllMovies)
  .post(authMiddleware, createMovie)

router.route('/:id')
  .get(getMovie)
  .put(authMiddleware, updateMovie)
  .delete(authMiddleware, removeMovie)

module.exports = router;
