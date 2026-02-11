const express = require('express');
const router = express.Router();
const VoucherController = require('../controllers/voucherController');

/**
 * @swagger
 * tags:
 *   name: Vouchers
 *   description: Voucher, coupon & gift card management
 */


router.get('/', VoucherController.getAll);

/**
 * @swagger
 * /vouchers/{id}:
 *   get:
 *     summary: Get voucher by ID
 *     tags: [Vouchers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Voucher found
 *       404:
 *         description: Voucher not found
 */
router.get('/:id', VoucherController.getOne);
/**
 * @swagger
 * /vouchers/redeem:
 *   post:
 *     summary: Redeem a voucher
 *     tags: [Vouchers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - voucher_id
 *               - user_id
 *             properties:
 *               voucher_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               merchant_id:
 *                 type: integer
 *               redeemed_value:
 *                 type: number
 *     responses:
 *       200:
 *         description: Voucher redeemed
 *       400:
 *         description: Validation error
 */
router.post('/redeem', VoucherController.redeem);
/**
/**
 * @swagger
 * /vouchers/issue:
 *   post:
 *     summary: Issue a new voucher
 *     tags: [Vouchers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - code
 *               - voucher_value
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               voucher_value:
 *                 type: number
 *               value_type:
 *                 type: string
 *                 enum: [fixed, percent]
 *               min_spend:
 *                 type: number
 *               max_redemptions:
 *                 type: integer
 *               company_id:
 *                 type: integer
 *               merchant_id:
 *                 type: integer
 *               assigned_user_id:
 *                 type: integer
 *               expiry_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Voucher issued
 *       400:
 *         description: Validation error
 */
router.post('/issue', VoucherController.issue);

/**
 * @swagger
 * /vouchers/{id}:
 *   put:
 *     summary: Update a voucher
 *     tags: [Vouchers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Voucher updated
 *       404:
 *         description: Voucher not found
 */
router.put('/:id', VoucherController.update);

/**
 * @swagger
 * /vouchers/{id}:
 *   delete:
 *     summary: Delete a voucher
 *     tags: [Vouchers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Voucher deleted
 */
router.delete('/:id', VoucherController.delete);

/**
 * @swagger
 * /vouchers/company/{companyId}:
 *   get:
 *     summary: Get vouchers by company
 *     tags: [Vouchers]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company vouchers
 */
router.get('/company/:companyId', VoucherController.getByCompany);

/**
 * @swagger
 * /vouchers/user/{userId}:
 *   get:
 *     summary: Get vouchers assigned to a user
 *     tags: [Vouchers]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User vouchers
 */
router.get('/user/:userId', VoucherController.getByUser);

/**
 * @swagger
 * /vouchers/merchant/{merchantId}:
 *   get:
 *     summary: Get vouchers by merchant
 *     tags: [Vouchers]
 *     parameters:
 *       - in: path
 *         name: merchantId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Merchant vouchers
 */
router.get('/merchant/:merchantId', VoucherController.getByMerchant);

module.exports = router;
