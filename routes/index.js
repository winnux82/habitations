const portail = require('./portail.routes');
const habitations = require('./habitations.routes');

module.exports = function (app) {
    app.use('/', portail);
    app.use('/habitations', habitations);
};
