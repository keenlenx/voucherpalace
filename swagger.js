const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const setupSwagger = (app) => {
  const options = {
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'Voucher Palace API',
        version: '1.0.0',
        description: 'API for managing vouchers, discounts, gift cards, and coupon redemptions across multiple companies and merchants.'
      },
      servers: [
        {
          url: `http://voucher.agiza.co.ke:${process.env.PORT}`,
          description: 'Local server'
        },
         {
          url: `https://provoucher.agiza.co.ke:${process.env.PORT}`,
          description: 'Local server'
        },
        {
          url: `http://localhost:${process.env.PORT}`,
          description: 'Local server'
        }

      ],
      components: {
        schemas: {
          Company: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
              contact_email: { type: 'string' },
              contact_phone: { type: 'string' },
              company_status: { type: 'string', enum: ['active', 'suspended', 'inactive'] },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' }
            }
          },
          User: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' }
            }
          },
          Merchant: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
              contact_email: { type: 'string' },
              contact_phone: { type: 'string' },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' }
            }
          },
          Voucher: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              voucher_code: { type: 'string' },
              value: { type: 'number' },
              company_id: { type: 'integer' },
              merchant_id: { type: 'integer' },
              assigned_user_id: { type: 'integer', nullable: true },
              expiry_date: { type: 'string', format: 'date-time' },
              voucher_status: { type: 'string', enum: ['active', 'redeemed', 'suspended', 'cancelled'] },
              max_redemptions: { type: 'integer' },
              min_spend: { type: 'number' },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' }
            }
          },
          VoucherRedemption: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              voucher_id: { type: 'integer' },
              user_id: { type: 'integer' },
              merchant_id: { type: 'integer' },
              redeemed_value: { type: 'number' },
              redeemed_at: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    },
    apis: [
      './routes/*.js', // Scan all route files for swagger comments
    ]
  };

  const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`📖 Swagger UI available at http://localhost:${process.env.PORT}/api-docs`);
};

module.exports = setupSwagger;
