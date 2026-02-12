const { User } = require('../models');

class UserController {
  // --------------------
  // Basic CRUD
  // --------------------

  static async getAll(req, res) {
    try {
      const { page = 1, limit = 10, sort = 'created_at', order = 'DESC' } = req.query;
      
      const users = await User.findAll({
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
        order: [[sort, order]]
      });
      
      const total = await User.count();
      
      res.json({
        data: users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getOne(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      await user.update(req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      await user.destroy();
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // --------------------
  // Get by Phone & Email
  // --------------------

  static async getByPhone(req, res) {
    try {
      const user = await User.findOne({ 
        where: { phone: req.params.phone }
      });
      
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getByEmail(req, res) {
    try {
      const user = await User.findOne({ 
        where: { email: req.params.email }
      });
      
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // --------------------
  // Search
  // --------------------

  static async search(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
      }
      
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { full_name: { [Op.like]: `%${q}%` } },
            { email: { [Op.like]: `%${q}%` } },
            { phone: { [Op.like]: `%${q}%` } }
          ]
        },
        limit: 20
      });
      
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // --------------------
  // Status
  // --------------------

  static async getByStatus(req, res) {
    try {
      const users = await User.findAll({
        where: { user_status: req.params.status }
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async activate(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      user.user_status = 'active';
      await user.save();
      res.json({ success: true, message: 'User activated', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async suspend(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      user.user_status = 'suspended';
      await user.save();
      res.json({ success: true, message: 'User suspended', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deactivate(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      user.user_status = 'inactive';
      await user.save();
      res.json({ success: true, message: 'User deactivated', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;