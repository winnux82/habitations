const express = require('express');
const router = express.Router();

const AgentController = require('../controllers/agent.controller');
const HabitationController = require('../controllers/habitation.controller');
const portailController = require('../controllers/portail.controller');


router.get('/habitations', HabitationController.habitations);


router.get('/admin', portailController.admin);


router.get('/agents', AgentController.agents);

router.get('/agent/create', AgentController.createAgentForm);


module.exports = router;