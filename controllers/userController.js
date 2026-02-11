const User = require('../models/user');

exports.getAll = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.getOne = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.create = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

exports.update = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  await user.update(req.body);
  res.json(user);
};

exports.delete = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  await user.destroy();
  res.json({ message: 'Deleted successfully' });
};
