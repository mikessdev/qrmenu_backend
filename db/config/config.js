require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    username: 'postgres',
    password: '12345',
    port: '5432',
  },
};
