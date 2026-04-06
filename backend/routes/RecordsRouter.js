const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const authorizeRole = require("../middleware/roleMiddleware");
const { CreateRecordValidation } = require('../middleware/RecordValidation');

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/RecordsController");

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Financial records management
 */

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a new financial record
 *     tags: [Records]
 *     description: >
 *       **ADMIN only.** Creates a new income or expense record.
 *       Requires a valid `accessToken` cookie or Bearer token.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRecordRequest'
 *           examples:
 *             income:
 *               summary: Income record
 *               value:
 *                 amount: 5000
 *                 type: "INCOME"
 *                 category: "Salary"
 *                 date: "2024-04-01"
 *                 notes: "Monthly salary"
 *             expense:
 *               summary: Expense record
 *               value:
 *                 amount: 1200
 *                 type: "EXPENSE"
 *                 category: "Utilities"
 *                 date: "2024-04-05"
 *                 notes: "Electricity bill"
 *     responses:
 *       201:
 *         description: Record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       400:
 *         description: Validation error (missing/invalid fields)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized — no token provided
 *       403:
 *         description: Forbidden — ADMIN role required
 *       500:
 *         description: Internal server error
 */
router.post(
  "/records",
  isLoggedIn,
  authorizeRole("ADMIN"),
  CreateRecordValidation,
  createRecord
);

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all financial records
 *     tags: [Records]
 *     description: >
 *       **ADMIN and ANALYST.** Returns all financial records in the system.
 *       Requires a valid `accessToken` cookie or Bearer token.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 records:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Record'
 *       401:
 *         description: Unauthorized — no token provided
 *       403:
 *         description: Forbidden — ADMIN or ANALYST role required
 *       500:
 *         description: Internal server error
 */
router.get(
  "/records",
  isLoggedIn,
  authorizeRole("ADMIN", "ANALYST"),
  getRecords
);

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a financial record
 *     tags: [Records]
 *     description: >
 *       **ADMIN only.** Updates an existing record by its ID.
 *       Requires a valid `accessToken` cookie or Bearer token.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the record
 *         example: "661a2b3c4d5e6f7a8b9c0d2f"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRecordRequest'
 *           example:
 *             amount: 6000
 *             type: "INCOME"
 *             category: "Freelance"
 *             date: "2024-04-10"
 *             notes: "Updated freelance payment"
 *     responses:
 *       200:
 *         description: Record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       401:
 *         description: Unauthorized — no token provided
 *       403:
 *         description: Forbidden — ADMIN role required
 *       404:
 *         description: Record not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/records/:id",
  isLoggedIn,
  authorizeRole("ADMIN"),
  updateRecord
);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a financial record
 *     tags: [Records]
 *     description: >
 *       **ADMIN only.** Permanently deletes a record by its ID.
 *       Requires a valid `accessToken` cookie or Bearer token.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the record
 *         example: "661a2b3c4d5e6f7a8b9c0d2f"
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       401:
 *         description: Unauthorized — no token provided
 *       403:
 *         description: Forbidden — ADMIN role required
 *       404:
 *         description: Record not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/records/:id",
  isLoggedIn,
  authorizeRole("ADMIN"),
  deleteRecord
);

module.exports = router;