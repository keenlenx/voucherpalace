const Merchant = require('../models/merchant');

exports.getAll = async (req, res) => {
  const merchants = await Merchant.findAll();
  res.json(merchants);
};

exports.getOne = async (req, res) => {
  const merchant = await Merchant.findByPk(req.params.id);
  if (!merchant) return res.status(404).json({ error: 'Merchant not found' });
  res.json(merchant);
};

exports.create = async (req, res) => {
  const merchant = await Merchant.create(req.body);
  res.status(201).json(merchant);
};

exports.update = async (req, res) => {
  const merchant = await Merchant.findByPk(req.params.id);
  if (!merchant) return res.status(404).json({ error: 'Merchant not found' });
  await merchant.update(req.body);
  res.json(merchant);
};

exports.delete = async (req, res) => {
  const merchant = await Merchant.findByPk(req.params.id);
  if (!merchant) return res.status(404).json({ error: 'Merchant not found' });
  await merchant.destroy();
  res.json({ message: 'Deleted successfully' });
};
