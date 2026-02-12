const { VoucherRedemption, Company, Voucher, User, Merchant } = require('../models');
const sequelize = require('../sequelize');

class VoucherController {
  // --------------------
  // CRUD
  // --------------------

  static async getAll(req, res) {
    try {
      const vouchers = await Voucher.findAll({
        include: [
          { model: Company },
          { model: Merchant },
          { model: User, as: 'assigned_user' },
          { model: VoucherRedemption, as: 'redemptions' }
        ]
      });
      res.json(vouchers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getOne(req, res) {
    try {
      const voucher = await Voucher.findByPk(req.params.id, {
        include: [
          { model: Company },
          { model: Merchant },
          { model: User, as: 'assigned_user' },
          { model: VoucherRedemption, as: 'redemptions' }
        ]
      });
      if (!voucher) return res.status(404).json({ error: 'Voucher not found' });
      res.json(voucher);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const voucher = await Voucher.create(req.body);
      res.status(201).json(voucher);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const voucher = await Voucher.findByPk(req.params.id);
      if (!voucher) return res.status(404).json({ error: 'Voucher not found' });
      await voucher.update(req.body);
      res.json(voucher);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const voucher = await Voucher.findByPk(req.params.id);
      if (!voucher) return res.status(404).json({ error: 'Voucher not found' });
      await voucher.destroy();
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // --------------------
  // Issue Voucher
  // --------------------
  static async issue(req, res) {
    try {
      const voucher = await Voucher.create(req.body);
      res.json({ success: true, voucher });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // --------------------
  // Redeem Voucher
  // --------------------
  static async redeem(req, res) {
    const { voucher_id, user_id, merchant_id, redeemed_value } = req.body;

    try {
      const voucher = await Voucher.findByPk(voucher_id);
      if (!voucher) return res.status(404).json({ error: 'Voucher not found' });

      if (voucher.voucher_status !== 'active') {
        return res.status(400).json({ error: 'Voucher not active' });
      }

      // Check usage limit
      const redemptionCount = await VoucherRedemption.count({ where: { voucher_id } });
      if (redemptionCount >= voucher.max_redemptions) {
        return res.status(400).json({ error: 'Max redemptions reached' });
      }

      const redemption = await VoucherRedemption.create({
        voucher_id,
        user_id,
        merchant_id,
        redeemed_value
      });

      // Update voucher status if fully redeemed
      if (redemptionCount + 1 >= voucher.max_redemptions) {
        voucher.voucher_status = 'redeemed';
        await voucher.save();
      }

      res.json({ success: true, redemption });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // --------------------
  // Dynamic Queries
  // --------------------

  static async getByCompany(req, res) {
    try {
      const vouchers = await Voucher.findAll({ 
        where: { company_id: req.params.companyId },
        include: [
          { model: User, as: 'assigned_user' }
        ]
      });
      res.json(vouchers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getByUser(req, res) {
    try {
      const vouchers = await Voucher.findAll({ 
        where: { assigned_user_id: req.params.userId },
        include: [
          { model: Company },
          { model: Merchant }
        ]
      });
      res.json(vouchers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getByMerchant(req, res) {
    try {
      const vouchers = await Voucher.findAll({ 
        where: { merchant_id: req.params.merchantId },
        include: [
          { model: Company },
          { model: User, as: 'assigned_user' }
        ]
      });
      res.json(vouchers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getByCode(req, res) {
    try {
      const voucher = await Voucher.findOne({ 
        where: { code: req.params.code },
        include: [
          { model: Company },
          { model: Merchant },
          { model: User, as: 'assigned_user' },
          { model: VoucherRedemption, as: 'redemptions' }
        ]
      });
      
      if (!voucher) return res.status(404).json({ error: 'Voucher not found' });
      res.json(voucher);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = VoucherController;