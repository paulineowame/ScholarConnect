const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function sendView(res, file) {
  res.sendFile(path.join(__dirname, 'views', file));
}

// Public routes
app.get('/',               (req, res) => sendView(res, 'index.html'));
app.get('/login',          (req, res) => sendView(res, 'login.html'));
app.get('/register',       (req, res) => sendView(res, 'register.html'));
app.get('/find-tutor',     (req, res) => sendView(res, 'find-tutor.html'));

// Dashboard routes
app.get('/dashboard/student', (req, res) => sendView(res, 'dashboard-student.html'));
app.get('/dashboard/tutor',   (req, res) => sendView(res, 'dashboard-tutor.html'));
app.get('/dashboard/parent',  (req, res) => sendView(res, 'dashboard-parent.html'));

// In-memory user store (prototype)
const users = [];

// Register endpoint
app.post('/register', (req, res) => {
  const { name, email, role } = req.body;
  if (!email || !role) return res.status(400).json({ error: 'Missing fields' });
  if (users.find(u => u.email === email)) return res.status(409).json({ error: 'Email already registered' });
  users.push({ name, email, role, createdAt: new Date() });
  console.log(`[ScholarConnect] New ${role} registered: ${email}`);
  res.json({ success: true, role });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, role } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'No account found' });
  if (role && user.role !== role) return res.status(403).json({ error: 'wrong_role', actualRole: user.role });
  res.json({ success: true, role: user.role, name: user.name });
});

app.listen(PORT, () => {
  console.log(`ScholarConnect running on http://localhost:${PORT}`);
  console.log(`Business contact: scholarconnect@outlook.com`);
});
