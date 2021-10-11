var express = require('express');
var router = express.Router();
const { getAllCharacters, getCharacter, updateCharacter, createCharacter, removeCharacter } = require("../controllers/charactersController")

const authMiddleware = require("../middleware/auth"); // middleware 
/* GET all Characters. */
router.route('/')
  .get(getAllCharacters)
  .post(authMiddleware, createCharacter)

router.route('/:id')
  .get(getCharacter)
  .put(authMiddleware, updateCharacter)
  .delete(authMiddleware, removeCharacter)

module.exports = router;
