const { GetDashboardData } = require('../controllers/DashboardController');
const isLoggedIn = require('../middleware/isLoggedIn');
const authorizeRole = require('../middleware/roleMiddleware');

const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Financial summary dashboard
 */

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get financial summary
 *     tags: [Dashboard]
 *     description: >
 *       **ADMIN, ANALYST and VIEWER.** Returns an aggregated financial summary
 *       (totals, breakdowns, etc.) for the dashboard view.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Aggregated financial data
 *       401:
 *         description: Unauthorized — no token provided
 *       403:
 *         description: Forbidden — ADMIN or ANALYST role required
 */
router.get('/summary', isLoggedIn, authorizeRole('ADMIN', 'ANALYST', 'VIEWER'), GetDashboardData);

module.exports = router;