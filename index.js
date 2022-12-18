const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const path = require('path');
const { success } = require('./helpers/helper');
const bp = require('body-parser');
const prettier = require('prettier');

require('dotenv').config();

// const sequelize = require('./config/sequelize')

const app = express();
const port = 7700;

const initAllRoutes = require('./routes');
const portailRoutes = require('./routes/portail.routes');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const db = require('./config/database');

try {
    db.authenticate()
        .then((_) =>
            console.log('Connexion à la base de données a bien été établie.')
        )
        .catch((error) =>
            console.error(
                `Impossible de se connecter à la base de données...${error}`
            )
        );
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.get('/', (req, res) => {
    res.redirect('/habitations');
});
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs').set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1); // trust first proxy
app.use(express.static('public'))
    .use(
        session({
            secret: 'Pd4UIdgMa',
            resave: false,
            saveUninitialized: true,
            //cookie: { secure: true }
        })
    )
    .use(flash())

    .use('/', portailRoutes)
    .use(morgan('dev'))
    .use(favicon(__dirname + '/favicon.ico'))
    .use((use, res) => {
        res.status(404);
        res.redirect('/404');
    })
    .use((err, req, res, next) => {
        console.log(err);
        res.status(500);
        res.send(`Erreur interne du serveur ${err}`);
    });
app.listen(port, () => {
    console.log(
        `L\'application GDP est démarrée sur : http://localhost:${port}`
    );
});

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});
