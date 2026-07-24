// 1. Fix Node v22/v24 Windows DNS issue for MongoDB Atlas SRV lookups
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

// 2. Load Environment Variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 3. Import your modular route definitions
const urlRoutes = require('./routes/urlRoutes');

const app = express();

// 4. Connect to MongoDB Atlas
const dbUri = (process.env.MONGO_URI || '').trim();
mongoose.connect(dbUri)
    .then(() => console.log('MongoDB Atlas connected successfully!'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// 5. Global Middlewares
app.use(cors({
    origin: (origin, callback) => {
        if (
            !origin ||
            origin === "http://localhost:5173" ||
            origin.endsWith(".vercel.app")
        ) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}));

app.use(express.json());

// 6. Mount Application Routes
app.use('/', urlRoutes);

// 7. Centralized Global Error Handler (Java @ControllerAdvice equivalent)
app.use((err, req, res, next) => {
    console.error('Unhandled Server Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 8. Start HTTP Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));