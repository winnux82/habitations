const router = require('express').Router();
const AgentController = require('../controllers/agent.controller');
const HabitationController = require('../controllers/habitation.controller');
const ValidationController = require('../controllers/validation.controller');
const PortailController = require('../controllers/portail.controller');

//Administration
router.get('/admin', PortailController.admin);
router.get('/404', PortailController.err404);

//Agents
router.get('/agents', AgentController.agents);
router.get('/agents/json', AgentController.getAll);
router.post('/agents/create', AgentController.createAgent);
router.get('/agents/create', AgentController.createAgentForm);
router.get('/agents/:id/', AgentController.fillForm);
router.post('/agents/:id/update', AgentController.updateAgent);
router.get('/agents/:id/delete', AgentController.deleteAgent);

//Habitations
router.get('/habitations', HabitationController.habitations);
router.get('/habitations/all', HabitationController.habitationsAll);
router.get('/habitations/json', HabitationController.getAll);
router.post('/habitations/create', HabitationController.createHabitation);
router.get('/habitations/create', HabitationController.createHabitationForm);
router.post(
    '/habitations/validation',
    ValidationController.habitationValidation
);
router.get('/habitations/validation', HabitationController.habitationList);
router.get(
    '/habitations/validation/:localite?',
    HabitationController.habitationListByLocality
);
router.get('/habitations/:id/', HabitationController.fillForm);
router.post('/habitations/:id/update', HabitationController.updateHabitation);
router.get('/habitations/:id/delete', HabitationController.deleteHabitation);

//Validations
router.get('/validations', ValidationController.validations);
router.get('/validations/:id/delete', ValidationController.deleteValidation);

module.exports = router;
