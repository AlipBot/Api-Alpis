const mongoose = require('mongoose');

const verify = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: () => Date.now(),
    },

    expire_at: { type: Date, default: Date.now, expires: 1800 }
});

module.exports = mongoose.model('VerifyUser', verify);