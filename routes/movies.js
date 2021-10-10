var express = require('express');
var router = express.Router();

const { getAllCharacters, getCharacter, updateCharacter, createCharacter, removeCharacter } = require("../controllers/charactersController")

/* GET all Characters. */
router.route('/')
  .get(getAllCharacters)
  .post(createCharacter)

router.route('/:id')
  .get(getCharacter)
  .put(updateCharacter)
  .delete(removeCharacter)

module.exports = router;
