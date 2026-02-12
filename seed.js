require('dotenv').config();
const sequelize = require('./sequelize');
const Company = require('./models/Company');
const User = require('./models/User');
const Merchant = require('./models/Merchant');
const Voucher = require('./models/Voucher');

async function seed() {
  try {
    // Sync DB (non-destructive)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');

    // ----- Companies -----
    const [company1] = await Company.findOrCreate({
      where: { name: 'Acme Corp' },
      defaults: {
        contact_email: 'contact@acme.com',
        contact_phone: '123456789',
        status: 'active'
      }
    });

    const [company2] = await Company.findOrCreate({
      where: { name: 'Globex Inc' },
      defaults: {
        contact_email: 'hello@globex.com',
        contact_phone: '987654321',
        status: 'active'
      }
    });

    // ----- Users -----
    const usersData = [
      { full_name: 'Alice Johnson', email: 'alice@example.com', phone: '111111111', company_id: company1.id, status: 'active' },
      { full_name: 'Bob Smith', email: 'bob@example.com', phone: '222222222', company_id: company1.id, status: 'active' },
      { full_name: 'Carol Davis', email: 'carol@example.com', phone: '333333333', company_id: company2.id, status: 'active' }
    ];

    const users = [];
    for (const u of usersData) {
      const [user] = await User.findOrCreate({ where: { email: u.email }, defaults: u });
      users.push(user);
    }

    // ----- Merchants -----
    const merchantsData = [
      { name: 'Cafe Central', contact_email: 'cafe@central.com', contact_phone: '444444444', api_key: 'APIKEY123', status: 'active' },
      { name: 'Bistro Deluxe', contact_email: 'bistro@deluxe.com', contact_phone: '555555555', api_key: 'APIKEY456', status: 'active' }
    ];

    const merchants = [];
    for (const m of merchantsData) {
      const [merchant] = await Merchant.findOrCreate({ where: { name: m.name }, defaults: m });
      merchants.push(merchant);
    }

    // ----- Vouchers -----
    const vouchersData = [
      { voucher_code: 'VOUCHER1001', value: 10.0, company_id: company1.id, user_id: users[0].id, merchant_id: null, status: 'active', expiry_date: '2030-12-31' },
      { voucher_code: 'VOUCHER1002', value: 20.0, company_id: company1.id, user_id: users[1].id, merchant_id: null, status: 'active', expiry_date: '2030-12-31' },
      { voucher_code: 'VOUCHER2001', value: 15.0, company_id: company2.id, user_id: users[2].id, merchant_id: null, status: 'active', expiry_date: '2030-12-31' }
    ];

    for (const v of vouchersData) {
      await Voucher.findOrCreate({ where: { voucher_code: v.voucher_code }, defaults: v });
    }

    console.log('✅ Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seed();
