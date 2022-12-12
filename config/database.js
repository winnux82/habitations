const Sequelize = require('sequelize');
//const dotenv = require('dotenv');
//dotenv.config();

module.exports =  new Sequelize('gdp', 'eleve', 'eleve', {
  host: 'localhost',
  dialect: 'mysql',
  port:'3307'

});

