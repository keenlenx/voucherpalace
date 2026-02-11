const express = require('express');
const router = express.Router();
const settlementCtrl = require('../controllers/settlementController');

/**
 * @swagger
 * tags:
 *   name: Settlements
 *   description: Merchant settlements
 */

/**
 * @swagger
 * /settlements/generate:
 *   post:
 *     summary: Generate settlements for merchants
 *     tags: [Settlements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date: { type: string, format: date }
 *               end_date: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Settlements generated
 *       400:
 *         description: Error
 */
router.post('/generate', settlementCtrl.generate);

module.exports = router;
