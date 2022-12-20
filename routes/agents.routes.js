const agentsRoutes = require('express').Router();
const AgentController = require('../controllers/agent.controller');
//Agents
agentsRoutes.get('/agents', AgentController.agents);
agentsRoutes.get('/agents/json', AgentController.getAll);
agentsRoutes.post('/agents/create', AgentController.createAgent);
agentsRoutes.get('/agents/create', AgentController.createAgentForm);
agentsRoutes.get('/agents/:id(d+)', AgentController.fillForm);
agentsRoutes.post('/agents/:id/update', AgentController.updateAgent);
agentsRoutes.get('/agents/:id/delete', AgentController.deleteAgent);

module.exports = {
    agentsRoutes,
};
