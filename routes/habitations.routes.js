const express = require('express');
const router = express.Router();

const HabitationController = require('../controllers/habitation.controller');

//Habitations
router.get('/habitations', HabitationController.habitations);
router.get('/habitations/json', HabitationController.getAll);
router.post('/habitation/create', HabitationController.createHabitation);
router.get('/habitation/create', HabitationController.createHabitationForm);

router.get('/habitation/:id/delete', HabitationController.deleteHabitation);
router.get('/habitation/:id/', HabitationController.fillForm);
router.post('/habitation/:id/update', HabitationController.updateHabitation);
router.get(
    '/habitations/validation',
    HabitationController.validationHabitation
);

module.exports = router;
