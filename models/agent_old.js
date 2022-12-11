module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Agent', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: true
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: true
        },
        datedenaissance: {
            type: DataTypes.STRING,
            allowNull: true
        },
        matricule: {
            type: DataTypes.STRING,
            allowNull: true
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: true
        },

    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}

Agent.sync().then(() => {
    console.log('table created');
});