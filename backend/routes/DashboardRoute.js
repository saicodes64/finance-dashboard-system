const { GetDashboardData } = require('../controllers/DashboardController');

const router = require('express').Router();

router.get('/summary', GetDashboardData);

module.exports = router;