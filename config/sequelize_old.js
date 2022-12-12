
const { Sequelize, DataTypes } = require('sequelize');
//var orm = require('orm');
//const dotenv = require('.dotenv');
//dotenv.config();

const sequelize = new Sequelize('gdp', 'eleve', 'eleve', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3307',
});


sequelize.authenticate()
.then(_ => console.log('Connection à la base de données a bien été établie.'))
.catch(error => console.error(`Impossible de se connecter à la base de données...${error}`))

const Agent = AgentModel(sequelize, DataTypes);
const AgentModel = require('../models/agent')

sequelize.sync({ force: true })
    .then(_ => {
        console.log('La base de données "GDP" a bien été synchronisée.')

        Agent.create({
            nom: 'Vandermeulen',
            prenom: 'Christophe',
            matricule: 113
        }).then(christophe => console.log(christophe.toJSON()))
    })

module.exports = {
    
}
