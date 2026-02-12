const Voucher = require('../models/Voucher');
const MerchantSettlement = require('../models/MerchantSettlement');
const sequelize = require('../sequelize');

exports.generate = async (req, res) => {
  const { start_date, end_date } = req.body;
  const t = await sequelize.transaction();

  try {
    const redeemed = await Voucher.findAll({
      where: { status: 'redeemed', settled: 'no' },
      transaction: t
    });

    const merchants = [...new Set(redeemed.map(r => r.merchant_id))];

    for (let merchant_id of merchants) {
      const merchant_vouchers = redeemed.filter(v => v.merchant_id === merchant_id);
      const total = merchant_vouchers.reduce((sum, v) => sum + parseFloat(v.value), 0);

      await MerchantSettlement.create({
        merchant_id,
        settlement_period_start: start_date,
        settlement_period_end: end_date,
        total_amount: total,
        status: 'pending'
      }, { transaction: t });

      for (let v of merchant_vouchers) {
        v.settled = 'yes';
        await v.save({ transaction: t });
      }
    }

    await t.commit();
    res.json({ message: 'Settlements generated' });
  } catch (err) {
    await t.rollback();
    res.status(400).json({ error: err.message });
  }
};
