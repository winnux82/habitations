const express = require('express');
const session = require('express-session');
const favicon = require('serve-favicon');
const flash = require('connect-flash');
const morgan = require('morgan');
const path = require('path');
const { success } = require('./helpers/helper');
const bp = require('body-parser');
const prettier = require('prettier');

require('dotenv').config();

// const sequelize = require('./config/sequelize')

const app = express();
const port = 7800;
const portailRoutes = require('./routes/portail.routes');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const db = require('./config/database');

try {
    db.authenticate()
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

app.get('/', (req, res) => {
    res.redirect('/habitations');
});

app.set('view engine', 'ejs').set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
    .use('/', portailRoutes)
    .use(morgan('dev'))
    .use(favicon(__dirname + '/favicon.ico'))
    .use(flash())
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
