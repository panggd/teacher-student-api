var mysql = require('mysql');

const getDBConnection = () => {
  return mysql.createConnection({
    host: process.env.DATABASE_HOST || '127.0.0.1',
    user: 'root',
    password: 'test',
    database: 'school',
    port: 3306,
    insecureAuth : true
  });
};

module.exports = {
  getDBConnection
};