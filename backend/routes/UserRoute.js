const router = require('express').Router();
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/UserController');
const { CreateUserValidation, UpdateUserValidation } = require('../middleware/UserValidation');
const isLoggedIn = require('../middleware/isLoggedIn');
const authorizeRole = require('../middleware/roleMiddleware');

// All user management routes require login and ADMIN role
router.use(isLoggedIn);
router.use(authorizeRole('ADMIN'));

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management (ADMIN only)
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: >
 *       **ADMIN only.** Creates a new user account and assigns a role.
 *       Password is hashed automatically.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *           examples:
 *             analyst:
 *               summary: Create an Analyst
 *               value:
 *                 email: "analyst@test.com"
 *                 password: "Analyst@123"
 *                 role: "ANALYST"
 *                 isActive: true
 *             viewer:
 *               summary: Create a Viewer
 *               value:
 *                 email: "viewer@test.com"
 *                 password: "Viewer@123"
 *                 role: "VIEWER"
 *                 isActive: true
 */
router.post('/', CreateUserValidation, createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: >
 *       **ADMIN only.** Returns a list of all users. Passwords are excluded from the response.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — ADMIN role required
 */
router.get('/', getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     description: >
 *       **ADMIN only.** Returns details of a single user. Password is excluded.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "661a2b3c4d5e6f7a8b9c0d1e"
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — ADMIN role required
 *       404:
 *         description: User not found
 */
router.get('/:id', getUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     description: >
 *       **ADMIN only.** Update a user's email, password, role, or active status.
 *       Use `isActive: false` to soft-disable an account.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "661a2b3c4d5e6f7a8b9c0d1e"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *           examples:
 *             promoteToAdmin:
 *               summary: Promote to ADMIN
 *               value:
 *                 role: "ADMIN"
 *             deactivate:
 *               summary: Deactivate user
 *               value:
 *                 isActive: false
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — ADMIN role required
 *       404:
 *         description: User not found
 *       409:
 *         description: Email already in use
 */
router.put('/:id', UpdateUserValidation, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deactivate (soft delete) a user
 *     tags: [Users]
 *     description: >
 *       **ADMIN only.** Sets the user's `isActive` to `false`.
 *       The user will be blocked from logging in immediately.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "661a2b3c4d5e6f7a8b9c0d1e"
 */
router.delete('/:id', deleteUser);

module.exports = router;
