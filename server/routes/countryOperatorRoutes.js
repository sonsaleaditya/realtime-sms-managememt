// server/routes/countryOperatorRoutes.js
const express = require('express');
const { createOrUpdateCountryOperator, getCountryOperators, deleteCountryOperator } = require('../controllers/countryOperatorController');
const router = express.Router();

router.post('/reg-c-operator', createOrUpdateCountryOperator);
router.get('/fetch-operators', getCountryOperators);
router.delete('/delete-operator/:id', deleteCountryOperator);

module.exports = router;
