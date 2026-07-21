const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nanoid = require("nanoid");
const validUrl = require("valid-url");

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect("")
