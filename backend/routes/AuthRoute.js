const { Signup, Login, Logout } = require('../controllers/AuthController');
const { SignupValidation, LoginValidation } = require('../middleware/AuthValidation');
const isLoggedIn = require('../middleware/isLoggedIn');
const authorizeRole = require('../middleware/roleMiddleware');

const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization
 */

// --- Public routes ---

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 */
router.post('/signup', SignupValidation, Signup);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             admin:
 *               summary: Admin Login
 *               value:
 *                 email: "admin@test.com"
 *                 password: "Admin@123"
 *             analyst:
 *               summary: Analyst Login
 *               value:
 *                 email: "analyst@test.com"
 *                 password: "Analyst@123"
 *             viewer:
 *               summary: Viewer Login
 *               value:
 *                 email: "viewer@test.com"
 *                 password: "Viewer@123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *         headers:
 *           Set-Cookie:
 *             description: Contains the JWT access token
 *             schema:
 *               type: string
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (wrong password)
 *       404:
 *         description: User not found
 */
router.post('/login', LoginValidation, Login);


/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', Logout);

// --- Protected: any authenticated user ---
router.get('/protected', isLoggedIn, (req, res) => {
  res.json({ success: true, user: req.user });
});

// --- Role-protected example routes ---
// Only ADMIN
router.get('/admin', isLoggedIn, authorizeRole('ADMIN'), (req, res) => {
  res.json({ success: true, message: 'Welcome, Admin!' });
});

// ADMIN or ANALYST
router.get('/analyst', isLoggedIn, authorizeRole('ADMIN', 'ANALYST'), (req, res) => {
  res.json({ success: true, message: 'Welcome, Analyst!' });
});

// All roles (ADMIN, ANALYST, WORKER)
router.get('/worker', isLoggedIn, authorizeRole('ADMIN', 'ANALYST', 'VIEWER   '), (req, res) => {
  res.json({ success: true, message: 'Welcome, Worker!' });
});

module.exports = router;
