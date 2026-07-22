const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config(); // MUST be the very first line

const express = require('express');
const mongoose = require('mongoose');

console.log("Checking URI:", process.env.MONGO_URI); // Debug check

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('DB Error:', err));