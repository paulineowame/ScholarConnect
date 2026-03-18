const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Simple in-memory "database" for prototype
const db = {
  users: [],
  tutors: []
};

// ── ROUTES ──

// Pages
app.get('/',          (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/login',     (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/register',  (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/register/student', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register-student.html')));
app.get('/register/tutor',   (req, res) => res.sendFile(path.join(__dirname, 'views', 'register-tutor.html')));
app.get('/find-tutor',(req, res) => res.sendFile(path.join(__dirname, 'views', 'find-tutor.html')));
app.get('/dashboard/student', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard-student.html')));
app.get('/dashboard/tutor',   (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard-tutor.html')));

// API — Student registration
app.post('/api/register/student', (req, res) => {
  const { firstName, lastName, email, password, level, city } = req.body;
  if (!firstName || !email || !password) {
    return res.json({ success: false, message: 'Please fill in all required fields.' });
  }
  if (db.users.find(u => u.email === email)) {
    return res.json({ success: false, message: 'An account with this email already exists.' });
  }
  const user = { id: Date.now(), type: 'student', firstName, lastName, email, level, city, createdAt: new Date() };
  db.users.push(user);
  res.json({ success: true, message: 'Student account created!', user });
});

// API — Tutor registration
app.post('/api/register/tutor', (req, res) => {
  const { firstName, lastName, email, password, qualification, institution, city, rate, subjects } = req.body;
  if (!firstName || !email || !password || !rate) {
    return res.json({ success: false, message: 'Please fill in all required fields.' });
  }
  if (db.users.find(u => u.email === email)) {
    return res.json({ success: false, message: 'An account with this email already exists.' });
  }
  const tutor = { id: Date.now(), type: 'tutor', firstName, lastName, email, qualification, institution, city, rate, subjects, status: 'pending', createdAt: new Date() };
  db.users.push(tutor);
  db.tutors.push(tutor);
  res.json({ success: true, message: 'Tutor application submitted!', user: tutor });
});

// API — Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email);
  if (!user) return res.json({ success: false, message: 'No account found with that email.' });
  // Prototype: accept any password
  res.json({ success: true, user });
});

// API — Get tutors list
app.get('/api/tutors', (req, res) => {
  res.json(db.tutors);
});

app.listen(PORT, () => {
  console.log(`\n  ScholarConnect running at http://localhost:${PORT}\n`);
});
