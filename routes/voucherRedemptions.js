const express = require('express');
const router = express.Router();
const VoucherRedemptionController = require('../controllers/voucherRedemptionController');

/**
 * @swagger
 * tags:
 *   name: VoucherRedemptions
 *   description: Manage voucher redemptions
 */

/**
 * @swagger
 * /voucher-redemptions:
 *   get:
 *     summary: Get all voucher redemptions
 *     tags: [VoucherRedemptions]
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: redeemed_at
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: DESC
 *           enum: [ASC, DESC]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of all voucher redemptions
 *       500:
 *         description: Server error
 */
router.get('/', VoucherRedemptionController.getAll);

/**
 * @swagger
 * /voucher-redemptions/{id}:
 *   get:
 *     summary: Get a redemption by its ID
 *     tags: [VoucherRedemptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Redemption ID
 *     responses:
 *       200:
 *         description: Redemption found
 *       404:
 *         description: Redemption not found
 *       500:
 *         description: Server error
 */
router.get('/:id', VoucherRedemptionController.getById);

/**
 * @swagger
 * /voucher-redemptions/voucher/{voucherId}:
 *   get:
 *     summary: Get all redemptions for a specific voucher
 *     tags: [VoucherRedemptions]
 *     parameters:
 *       - in: path
 *         name: voucherId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Voucher ID
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: redeemed_at
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: DESC
 *           enum: [ASC, DESC]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of redemptions for the voucher
 *       404:
 *         description: Voucher not found
 *       500:
 *         description: Server error
 */
router.get('/voucher/:voucherId', VoucherRedemptionController.getByVoucher);

/**
 * @swagger
 * /voucher-redemptions/user/{userId}:
 *   get:
 *     summary: Get all redemptions by user
 *     tags: [VoucherRedemptions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: redeemed_at
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: DESC
 *           enum: [ASC, DESC]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of redemptions for the user
 *       500:
 *         description: Server error
 */
router.get('/user/:userId', VoucherRedemptionController.getByUser);

/**
 * @swagger
 * /voucher-redemptions/merchant/{merchantId}:
 *   get:
 *     summary: Get all redemptions by merchant
 *     tags: [VoucherRedemptions]
 *     parameters:
 *       - in: path
 *         name: merchantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Merchant ID
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: redeemed_at
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: DESC
 *           enum: [ASC, DESC]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of redemptions for the merchant
 *       500:
 *         description: Server error
 */
router.get('/merchant/:merchantId', VoucherRedemptionController.getByMerchant);

/**
 * @swagger
 * /voucher-redemptions/company/{companyId}:
 *   get:
 *     summary: Get all redemptions by company
 *     tags: [VoucherRedemptions]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Company ID
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: redeemed_at
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: DESC
 *           enum: [ASC, DESC]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of redemptions for the company
 *       500:
 *         description: Server error
 */
router.get('/company/:companyId', VoucherRedemptionController.getByCompany);

module.exports = router;
