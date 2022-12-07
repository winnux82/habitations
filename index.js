const express = require('express');
const port = 3000;
var orm = require('orm');
var app = express();

require('dotenv').config();

const path = require('path');
const portailRoutes = require('./routes/portail.routes')

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
app.use('/',portailRoutes)

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
