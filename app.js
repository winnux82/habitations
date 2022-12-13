const express = require('express');
const favicon = require('serve-favicon');
const flash = require('connect-flash');

//var orm = require('orm');

// const AgentModel = require('./models/agent');
// const HabitationModel = require('./models/habitation');

require('dotenv').config();

var app = express();
const port = 7800;

const path = require('path');
const portailRoutes = require('./routes/portail.routes');

// const sequelize = new Sequelize('gdp', 'eleve', 'eleve', {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: '3307',
// });

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
// parse application/json
app.use(bodyParser.json());

try {
    sequelize
        .authenticate()
        .then((_) =>
            console.log('Connection à la base de données a bien été établie.')
        )
        .catch((error) =>
            console.error(
                `Impossible de se connecter à la base de données...${error}`
            )
        );
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// const Agent = AgentModel(sequelize, DataTypes);
// const Habitation = HabitationModel(sequelize, DataTypes);

// sequelize.sync({ force: true }).then((_) => {
//     console.log('La base de données "GDP" a bien été synchronisée.');

//     Agent.create({
//         adresse: 'Vandermeulen',
//         prenom: 'Christophe',
//         matricule: 113,
//     }).then((christophe) => console.log(christophe.toJSON()));
// });
// sequelize.sync({ force: true }).then((_) => {
//     console.log('La base de données "GDP" a bien été synchronisée.');

//     Habitation.create({
//         adresse: 'Essai',
//     }).then((christophe) => console.log(christophe.toJSON()));
// });
// app.use(orm.express("mysql://eleve:eleve@localhost/gdp", {
// 	define: function (db, models, next) {
// 		models.person = db.define("person", );
// 		next();
// 	}
// }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/habitations');
});

//ajout d'un préfixe après la / si nécessaire!
app.use('/', portailRoutes);

app.use((use, res) => {
    res.status(404);
    res.send('page non trouvée');
});

// app.get('/', function (req, res) {
//     //res.send('hello world');
//     res.render('home');
// })

// app.get('/hi/:name/:lastname', (req, res) => {
//     console.log(req.params);
//     res.render('hi', { firstname: req.params.name, lastname: req.params.lastname })
// })

app.listen(port, () => {
    console.log(
        `L\'application GDP est démarrée sur : http://localhost:${port}`
    );
});
