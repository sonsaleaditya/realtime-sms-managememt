// server/routes/processRoutes.js
const express = require('express');
const { startProcess, stopProcess , getSessions} = require('../controllers/processController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/start', authenticate, startProcess);
router.post('/stop', authenticate, stopProcess);
// server/routes/processRoutes.js
router.get('/sessions', authenticate, getSessions);

module.exports = router;
