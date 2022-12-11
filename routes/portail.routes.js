const express = require('express');
const router = express.Router();
const db = require('../config/database');

const AgentController = require('../controllers/agent.controller');
const HabitationController = require('../controllers/habitation.controller');
const portailController = require('../controllers/portail.controller');



router.get('/admin', portailController.admin);

//Agents
router.get('/agents', AgentController.agents);
router.get('/agent/create', AgentController.createAgentForm);
//router.get('/agents/createOne', AgentController.createOne);
router.get('/agents/list', AgentController.getAll);
//router.get('/agents/getAll', AgentController.getAll);

//Habitations
router.get('/habitations', HabitationController.habitations);

router.get('/habitation/create', HabitationController.createHabitationForm);

router.get('/404', portailController.err404);

module.exports = router;