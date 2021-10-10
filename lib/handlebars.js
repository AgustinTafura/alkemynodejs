const express_handlebars_sections = require('express-handlebars-sections');
const helpers = {};

helpers.section = express_handlebars_sections()


//get json
helpers.json = function(context) {
  return JSON.stringify(context);
};

//if equals
helpers.if_eq = function(a,b, opt) {
  console.log('test', a, b)
  console.log(a==b)
  return a == b? opt.fn(this): opt.inverse(this);
};



module.exports = helpers;
