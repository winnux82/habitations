const agentsRoutes = require('express').Router();
const AgentController = require('../controllers/agent.controller');
//Agents
router.get('/agents', AgentController.agents);
router.get('/agents/json', AgentController.getAll);
router.post('/agents/create', AgentController.createAgent);
router.get('/agents/create', AgentController.createAgentForm);
router.get('/agents/:id(d+)', AgentController.fillForm);
router.post('/agents/:id/update', AgentController.updateAgent);
router.get('/agents/:id/delete', AgentController.deleteAgent);

module.exports = {
    agentsRoutes,
};
