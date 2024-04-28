const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String, required: false}
});

module.exports = mongoose.model('Mascota', mascotaSchema);