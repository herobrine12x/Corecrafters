const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MySQL (XAMPP default: user 'root', no password)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'corecrafters'
});

db.connect(err => {
    if (err) {
        console.error('❌ MySQL connection failed:', err);
        return;
    }
    console.log('✅ Connected to XAMPP MySQL Database');
});

// 2. API Route: Get stats
app.get('/api/user/stats', (req, res) => {
    const query = "SELECT * FROM user_stats ORDER BY id DESC LIMIT 1";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0] || { calories: 0, steps: "0", sleep: "0" });
    });
});

// 3. API Route: Update stats (We'll use this later)
app.post('/api/user/update', (req, res) => {
    const { calories, steps, sleep } = req.body;
    const query = "INSERT INTO user_stats (calories, steps, sleep) VALUES (?, ?, ?)";
    db.query(query, [calories, steps, sleep], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Stats updated locally!" });
    });
});

// REGISTRATION ROUTE
app.post('/api/register', (req, res) => {
    const { fullname, username, email, password } = req.body;
    const query = "INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)";
    
    db.query(query, [fullname, username, email, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: "Username or Email already exists" });
            return res.status(500).json(err);
        }
        res.json({ message: "Registration successful!", userId: result.insertId });
    });
});

// LOGIN ROUTE
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(query, [username, password], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length > 0) {
            res.json({ message: "Login successful", user: results[0] });
        } else {
            res.status(401).json({ error: "Invalid username or password" });
        }
    });
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));