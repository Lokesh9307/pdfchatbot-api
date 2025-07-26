const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// ✅ CORS Config
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://superllm.vercel.app',
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// ✅ Routes
app.use('/api/chat', chatRoutes);

// ✅ Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running perfectly.' });
});

// ✅ Start server
const PORT = process.env.RUNNING_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
