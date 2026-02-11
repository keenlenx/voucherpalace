const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/companyController');

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of companies
 */
router.get('/', CompanyController.getAll);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get a single company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Company ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company data
 *       404:
 *         description: Company not found
 */
router.get('/:id', CompanyController.getOne);

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contact_email:
 *                 type: string
 *               contact_phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company created
 */
router.post('/', CompanyController.create);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update an existing company
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contact_email:
 *                 type: string
 *               contact_phone:
 *                 type: string
 *               company_status:
 *                 type: string
 *                 enum: [active, suspended, inactive]
 *     responses:
 *       200:
 *         description: Company updated
 */
router.put('/:id', CompanyController.update);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete a company
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company deleted
 */
router.delete('/:id', CompanyController.delete);

module.exports = router;
