const mongoose = require('mongoose');

const dataweb = mongoose.Schema({
    RequestToday: { type: Number }
}, { versionKey: false });
module.exports = mongoose.model('Website Database', dataweb);