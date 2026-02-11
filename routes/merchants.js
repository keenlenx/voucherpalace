const express = require('express');
const router = express.Router();
const merchantCtrl = require('../controllers/merchantController');

/**
 * @swagger
 * tags:
 *   name: Merchants
 *   description: Merchant management
 */

router.get('/', merchantCtrl.getAll);
router.get('/:id', merchantCtrl.getOne);
router.post('/', merchantCtrl.create);
router.put('/:id', merchantCtrl.update);
router.delete('/:id', merchantCtrl.delete);

module.exports = router;
