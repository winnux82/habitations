const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const path = require('path');
const { success } = require('./helpers/helper');
const bp = require('body-parser');
const prettier = require('prettier');

// const env = require('dotenv').config();

// console.log(env);

const portailRoutes = require('./routes/portail.routes');
// const agentsRoutes = require('./routes/agents.routes');
// const habitationsRoutes = require('./routes/habitations.routes');
// const sequelize = require('./config/sequelize')

const app = express();
const port = 7700;

//const initAllRoutes = require('./routes');
// const agentsRoutes = require('./routes/agents.routes');

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
    // .use('/agents', agentsRoutes)
    // .use('/habitations', habitationsRoutes)
    // .use('/agents', agentsRoutes)
    .use(morgan('dev'))
    .use(favicon(__dirname + '/favicon.ico'))
    .use((use, res) => {
        res.status(404);
        res.redirect('/404');
    });

// app.listen(port, () => {
//     console.log(
//         `L\'application GDP est démarrée sur : http://localhost:${port}`
//     );
// });

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log('Time:', Date.now());
    next();
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
