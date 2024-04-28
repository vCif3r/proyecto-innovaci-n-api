const mongoose = require('mongoose');

const testimonioSchema = new mongoose.Schema({
    img: {type: String, required: true },
    title: {type: String, required: true },
    description: {type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Testimonio', testimonioSchema);