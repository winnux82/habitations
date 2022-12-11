const express = require('express');
const favicon = require('serve-favicon')
const flash = require('connect-flash')
const morgan = require('morgan')
const { success } = require('./helpers/helper');

const sequelize = require('./config/sequelize')



require('dotenv').config();

var app = express();
const port = 7800;


const path = require('path');
const portailRoutes = require('./routes/portail.routes');



app.get('/', (req, res) => {
    res.redirect('/habitations');
});
app
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'views'));
app
    .use(express.static('public'))
    .use('/', portailRoutes)
    .use(morgan('dev'))
    .use(favicon(__dirname + '/favicon.ico'))
    .use(flash())
    .use((use, res) => {
        res.status(404);
        res.redirect('/404');
    });


// app.use(logger = (req, res, next) => {
//     console.log(`URL : ${req.url}`)
//     next();
// })

//ajout d'un préfixe après la / si nécessaire!

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
