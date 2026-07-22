const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        index: true // Indexing speeds up GET queries when looking up short codes
    },

    originalUrl: {
        type: String,
        required: true
    },

    clicks: {
        type: Number,
        required: true,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 604800 // 604,800 seconds = 7 days
    }
});

// Export the model (Java analogy: Repository/Entity)
module.exports = mongoose.model('Url', urlSchema);