const { Signup, Login, Logout } = require('../controllers/AuthController');
const { SignupValidation, LoginValidation } = require('../middleware/AuthValidation');
const isLoggedIn = require('../middleware/isLoggedIn');
const authorizeRole = require('../middleware/roleMiddleware');

const router = require('express').Router();

// --- Public routes ---
router.post('/signup', SignupValidation, Signup);
router.post('/login', LoginValidation, Login);
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
router.get('/worker', isLoggedIn, authorizeRole('ADMIN', 'ANALYST', 'WORKER'), (req, res) => {
  res.json({ success: true, message: 'Welcome, Worker!' });
});

module.exports = router;
