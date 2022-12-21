//const Habitation = require('../models/Album')
const catchAsync = require('../helpers/catchAsync');

// portailRoutes.get('/', (req, res) => {
//     res.redirect('/habitations');
// });

const main = catchAsync(async (req, res) => {
    res.render('home', {
        title: 'Home',
    });
});

const admin = catchAsync(async (req, res) => {
    res.render('admin', {
        title: 'Administration',
    });
});

const err404 = catchAsync(async (req, res) => {
    res.render('404', {
        title: 'Erreur 404',
    });
});

module.exports = {
    main,
    admin,
    err404,
};
