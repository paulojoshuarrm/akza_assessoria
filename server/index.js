const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Serve React build in production
app.use(express.static(path.join(__dirname, '../client/dist')));

// POST /api/leads - save a new lead
app.post('/api/leads', (req, res) => {
  const { name, email, whatsapp, message } = req.body;
  if (!name || !email || !whatsapp) {
    return res.status(400).json({ error: 'Nome, e-mail e WhatsApp são obrigatórios.' });
  }
  const stmt = db.prepare('INSERT INTO leads (name, email, whatsapp, message) VALUES (?, ?, ?, ?)');
  const result = stmt.run(name.trim(), email.trim(), whatsapp.trim(), message?.trim() || null);
  res.json({ id: result.lastInsertRowid });
});

// GET /api/leads - list all leads
app.get('/api/leads', (req, res) => {
  const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
  res.json(leads);
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
