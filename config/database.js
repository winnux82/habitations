const Sequelize = require('sequelize');
//const dotenv = require('dotenv');
//dotenv.config();

module.exports = new Sequelize('gdp', 'root', 'eleve', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
});

// module.exports = new Sequelize('gdp', 'eleve', 'eleve', {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: '3307',
// });
