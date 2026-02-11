// controllers/voucherRedemptionController.js
const VoucherRedemption = require('../models/voucherRedemption');
const Voucher = require('../models/voucher');
const User = require('../models/user');
const Merchant = require('../models/merchant');
const Company = require('../models/company');

class VoucherRedemptionController {
  static async getAll(req, res) {
    try {
      const { sort = 'redeemed_at', order = 'DESC' } = req.query;

      const redemptions = await VoucherRedemption.findAll({
        order: [[sort, order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']],
        include: [
          { model: Voucher, include: [Company] },
          User,
          Merchant
        ]
      });

      res.json(redemptions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const redemption = await VoucherRedemption.findByPk(req.params.id, {
        include: [
          { model: Voucher, include: [Company] },
          User,
          Merchant
        ]
      });

      if (!redemption) {
        return res.status(404).json({ error: 'Redemption not found' });
      }

      res.json(redemption);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getByMerchant(req, res) {
    try {
      const { sort = 'redeemed_at', order = 'DESC' } = req.query;

      const redemptions = await VoucherRedemption.findAll({
        where: { merchant_id: req.params.merchantId },
        order: [[sort, order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']],
        include: [Voucher, User]
      });

      res.json(redemptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getByUser(req, res) {
    try {
      const { sort = 'redeemed_at', order = 'DESC' } = req.query;

      const redemptions = await VoucherRedemption.findAll({
        where: { user_id: req.params.userId },
        order: [[sort, order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']],
        include: [Voucher, Merchant]
      });

      res.json(redemptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getByCompany(req, res) {
    try {
      const { sort = 'redeemed_at', order = 'DESC' } = req.query;

      const redemptions = await VoucherRedemption.findAll({
        include: [
          {
            model: Voucher,
            where: { company_id: req.params.companyId }
          },
          User,
          Merchant
        ],
        order: [[sort, order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']]
      });

      res.json(redemptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getByVoucher(req, res, next) {
  try {
    const { sort = 'redeemed_at', order = 'DESC' } = req.query;

    const redemptions = await VoucherRedemption.findAll({
      where: { voucher_id: req.params.voucherId },
      order: this.buildOrder(sort, order),
      include: [
        Voucher,
        User,
        Merchant
      ]
    });

    return res.json(redemptions);

  } catch (err) {
    console.error('❌ Redemption getByVoucher error:', err);
    next(err);
  }
}

}

module.exports = VoucherRedemptionController;
