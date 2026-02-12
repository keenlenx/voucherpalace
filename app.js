const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./sequelize');
require('dotenv').config();

// Import routes
const companyRoutes = require('./routes/companies');
const userRoutes = require('./routes/users');
const merchantRoutes = require('./routes/merchants');
const voucherRoutes = require('./routes/vouchers');
const RedemptionRoutes =require('./routes/voucherRedemptions');

// Swagger
const setupSwagger = require('./swagger');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Swagger docs
setupSwagger(app);

// Routes
app.use('/companies', companyRoutes);
app.use('/users', userRoutes);
app.use('/merchants', merchantRoutes);
app.use('/vouchers', voucherRoutes);
app.use('/voucher-redemptions', RedemptionRoutes)

// Root
app.get('/', (req, res) => {
  res.send('🎉 VoucherPalace API is running. Visit /api-docs for Swagger UI.');
});

// Start server
const PORT = process.env.PORT ;

sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📖 Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to DB:', err);
    process.exit(1);
  });
