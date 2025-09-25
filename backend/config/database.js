const mysql = require('mysql2');

// Create a single global DB connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',        // your MySQL username
  password: 'Harsh@2206', // your MySQL password
  database: 'UserApp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
  } else {
    console.log("✅ Connected to MySQL (global pool)");
    connection.release();
  }
});

module.exports = db;
