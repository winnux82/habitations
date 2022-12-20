const HabitationsRoutes = require('express').Router();
const HabitationController = require('../controllers/habitation.controller');

//Habitations
HabitationsRoutes.get('/habitations', HabitationController.habitations);
HabitationsRoutes.get('/habitations/json', HabitationController.getAll);
HabitationsRoutes.post(
    '/habitations/create',
    HabitationController.createHabitation
);
HabitationsRoutes.get(
    '/habitations/create',
    HabitationController.createHabitationForm
);
HabitationsRoutes.get(
    '/habitations/validation',
    HabitationController.habitationList
);
HabitationsRoutes.get(
    '/habitations/validation/:localite?',
    HabitationController.habitationListByLocality
);
HabitationsRoutes.get('/habitations/:id/', HabitationController.fillForm);
HabitationsRoutes.post(
    '/habitations/:id/update',
    HabitationController.updateHabitation
);
HabitationsRoutes.get(
    '/habitations/:id/delete',
    HabitationController.deleteHabitation
);
module.exports = { HabitationsRoutes };
