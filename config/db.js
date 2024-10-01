const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: '',
  password: '',
  database: '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection()
  .then((connection) => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

module.exports = db;
