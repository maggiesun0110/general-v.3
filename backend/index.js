const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'https://your-site.netlify.app' // Allow Netlify frontend
}));
app.use(express.json());

// Example Route
app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from backend!" });
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