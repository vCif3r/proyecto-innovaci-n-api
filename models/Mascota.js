const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  raza: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String, required: false},
  state: { type: String, required: true, enum: ['disponible','adoptado', 'apadrinado'], default: 'disponible'}
}, {
  timestamps: true // Esto agregará los campos `createdAt` y `updatedAt`
});

module.exports = mongoose.model('Mascota', mascotaSchema);