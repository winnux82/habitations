const Sequelize = require('sequelize');
const db = require('../config/database');

const Habitation = db.define('habitation', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    adresse: {
        type: Sequelize.STRING,
        allowNull: false
    },
    localite: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    demandeur: {
        type: Sequelize.STRING,
        allowNull: true
    },
    datedebut: {
        type: Sequelize.STRING,
        allowNull: true
    },
    datefin: {
        type: Sequelize.STRING,
        allowNull: true
    },
    mesures: {
        type: Sequelize.STRING,
        allowNull: true
    },
    vehicule: {
        type: Sequelize.STRING,
        allowNull: true
    },
    googlemap: {
        type: Sequelize.STRING,
        allowNull: true
    },

}, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
})

Agent.sync().then(() => {
    console.log('Table agents créée');
});


module.exports = Agent;