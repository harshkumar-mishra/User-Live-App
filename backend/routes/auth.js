const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Register API
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query = 'INSERT INTO login (email, password) VALUES (?, ?)';
  db.query(query, [email, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: "User already exists" });
      }
      return res.status(500).json({ message: "Error registering user", error: err });
    }
    return res.status(201).json({ message: "User registered successfully" });
  });
});

// Login API
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query = 'SELECT * FROM login WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error logging in", error: err });
    }

    if (results.length > 0) {
      return res.status(200).json({ 
        message: "Login successful!", 
        user: { id: results[0].id, email: results[0].email } 
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  });
});

module.exports = router;
