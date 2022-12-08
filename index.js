const express = require('express');
var app = express();
const { Sequelize } = require('sequelize');
const port = 7800;
//var orm = require('orm');

require('dotenv').config();

const path = require('path');
const portailRoutes = require('./routes/portail.routes');

'use strict';


const db = {};
const DB = process.env.DB_NAME;
const USER = 'eleve';
const PASSWORD = 'eleve';
const HOST = 'localhost';
const DIALECT = 'mysql';
const PORT = 3307;
const CONNECTION = new Sequelize(DB, USER, PASSWORD, { host: HOST, dialect: DIALECT, port: PORT })
module.exports.CONNECTION = CONNECTION;

// const sequelize = new Sequelize(
//     'process.env.DB_NAME',
//     'process.env.DB_USERNAME',
//     'process.env.DB_PASS',
//     {
//         //host: 'localhost',
//         dialect: 'mysql',
//         port: '3307',
//         // dialectOptions: {
//         //     timezone:'Etc/GTM+1'
//         // },
//         logging:false
//     }
// )

// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql',
//   });
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

CONNECTION.authenticate()
    .then(_ => console.log('Connection à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données...${error}`))


// sequelize.authenticate()
//     .then(_ => console.log('Connection à la base de données a bien été établie.'))
//     .catch(error=> console.error(`Impossible de se connecter à la base de données...${error}`))

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
app.use('/', portailRoutes)

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
    console.log(`L\'application GDP est démarrée sur : http://localhost:${port}`);
});
