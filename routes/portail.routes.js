const express = require('express');
const router = express.Router();
const portailController = require('../controllers/portail.controller');

router.get('/habitations', portailController.habitations);
router.get('/admin', portailController.admin);
router.get('/agents',portailController.agents)
module.exports = router;