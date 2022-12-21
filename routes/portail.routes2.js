const portailRoutes = require('express').Router();

const PortailController = require('../controllers/portail.controller');

//Administration

// portailRoutes.get('/', (req, res) => {
//     res.redirect('/habitations');
// });
portailRoutes.get('/', PortailController.main);
portailRoutes.get('/admin', PortailController.admin);
portailRoutes.get('/404', PortailController.err404);

module.exports = portailRoutes;

// //Agents
// router.get('/agents', AgentController.agents);
// router.get('/agents/json', AgentController.getAll);
// router.post('/agents/create', AgentController.createAgent);
// router.get('/agents/create', AgentController.createAgentForm);
// router.get('/agents/:id(\d+)/', AgentController.fillForm);
// router.post('/agents/:id/update', AgentController.updateAgent);
// router.get('/agents/:id/delete', AgentController.deleteAgent);

// //Habitations
// router.get('/habitations', HabitationController.habitations);
// router.get('/habitations/json', HabitationController.getAll);
// router.post('/habitations/create', HabitationController.createHabitation);
// router.get('/habitations/create', HabitationController.createHabitationForm);
// router.get('/habitations/validation', HabitationController.habitationList);
// router.get(
//     '/habitations/validation/:localite?',
//     HabitationController.habitationListByLocality
// );
// router.get('/habitations/:id/', HabitationController.fillForm);
// router.post('/habitations/:id/update', HabitationController.updateHabitation);
// router.get('/habitations/:id/delete', HabitationController.deleteHabitation);

// module.exports = router;
