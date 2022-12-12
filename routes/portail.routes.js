const express = require('express');
const router = express.Router();
const AgentController = require('../controllers/agent.controller');
const HabitationController = require('../controllers/habitation.controller');
const PortailController = require('../controllers/portail.controller');

//Administration
router.get('/admin', PortailController.admin);
router.get('/404', PortailController.err404);

//Agents
router.get('/agents', AgentController.agents);
router.get('/json', AgentController.getAll);
router.post('/agent/create', AgentController.createAgent);
router.get('/agent/create', AgentController.createAgentForm);
router.get('/agent/:id/delete', AgentController.deleteAgent);
router.get('/agent/:id/', AgentController.fillForm);
router.post('/agent/:id/update', AgentController.updateAgent);

//Habitations
router.get('/habitations', HabitationController.habitations);
router.get('/habitation/create', HabitationController.createHabitationForm);

module.exports = router;
