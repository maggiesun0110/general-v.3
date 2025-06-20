const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'https://smqms.netlify.app' // Allow Netlify frontend
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Example Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Contact Form Route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form submitted:", name, email, message);
  // You can add email, DB, etc.
  res.status(200).json({ status: "Received" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})