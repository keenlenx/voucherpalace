const Company = require('../models/company');

class CompanyController {
  static async getAll(req, res) {
    const companies = await Company.findAll();
    res.json(companies);
  }

  static async getOne(req, res) {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json(company);
  }

  static async create(req, res) {
    try {
      const company = await Company.create(req.body);
      res.json(company);
    } catch(err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    await company.update(req.body);
    res.json(company);
  }

  static async delete(req, res) {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    await company.destroy();
    res.json({ success: true });
  }
}

module.exports = CompanyController;
