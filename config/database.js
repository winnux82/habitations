const Sequelize = require('sequelize');
require('dotenv').config({ path: '.env.config' });

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALEC,
        port: process.env.DB_PORT,
    }
);
