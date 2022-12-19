const Sequelize = require('sequelize');
const db = require('../config/database');

const Habitation = db.define(
    'habitation',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        adresse: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        cp: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        localite: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        demandeur: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        datedebut: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        datefin: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        mesures: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        vehicule: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        googlemap: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
    }
);

Habitation.sync().then(() => {
    console.log('Table habitations créée');
});

module.exports = Habitation;
