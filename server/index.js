const connect = async () => {
  await require('./util/db');
  require('./util/app');
  console.log('Database and app set');
};

module.exports = connect();
