const bcrypt = require('bcryptjs'); // encrypt module

const helpers = {};


//para encriptar la contraseña
helpers.encryptPassword = async (password) => {

  const salt = await bcrypt.genSalt(10);  
  const hash = await bcrypt.hash(password, salt);
  return hash
}

//metodo para login, compara contraseña
helpers.matchPassword = async(password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
}


module.exports = helpers;
