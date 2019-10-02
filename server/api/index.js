require('dotenv/config');
const connect = async () => {
  await require('./main/db');
  require('./main/app');
  console.log('Database and app set');
};

module.exports = connect();
