var express = require('express');
var router = express.Router();
const authMiddleware = require("../middleware/auth"); // middleware 
const { getAllUsers, getUser, updateUser, addUser, removeUser } = require("../controllers/usersController")

router.route('/')
  .get(getAllUsers)
  .post(authMiddleware, addUser)

router.route('/:id')
  .get(getUser)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, removeUser)

module.exports = router;
