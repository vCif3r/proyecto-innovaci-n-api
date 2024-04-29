const mongoose = require('mongoose');

const PlanApadrinamientoSchema = new mongoose.Schema({
  img: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true}
}, {
  timestamps: true
});

module.exports = mongoose.model('PlanApadrinamiento', PlanApadrinamientoSchema);