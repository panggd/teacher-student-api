var mysql = require('mysql2/promise');

module.exports = {
  getDBConnection: async () => {
    let conn = null;
    try {
      conn = await mysql.createConnection({
        host: process.env.DATABASE_HOST || '127.0.0.1',
        user: 'root',
        password: 'test',
        database: 'school',
        port: 3306,
        insecureAuth : true
      });
    } catch(error) {
      throw new Error(error);
    }
    return conn;
  }
}