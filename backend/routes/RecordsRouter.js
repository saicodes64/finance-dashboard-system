const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/isLoggedIn");
const { authorize } = require("../middleware/roleMiddleware");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/RecordsController");

// Create → ADMIN only
router.post(
  "/records",
  isLoggedIn,
  authorize(["ADMIN"]),
  createRecord
);

// Read → ADMIN + ANALYST
router.get(
  "/records",
  isLoggedIn,
  authorize(["ADMIN", "ANALYST"]),
  getRecords
);

// Update → ADMIN only
router.put(
  "/records/:id",
  isLoggedIn,
  authorize(["ADMIN"]),
  updateRecord
);

// Delete → ADMIN only
router.delete(
  "/records/:id",
  isLoggedIn,
  authorize(["ADMIN"]),
  deleteRecord
);

/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get all financial records
 *     responses:
 *       200:
 *         description: List of records
 */
router.get("/records", getRecords);

module.exports = router;