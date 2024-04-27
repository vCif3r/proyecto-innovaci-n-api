// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://mongo:pzxvoENnDOtVTFhzVaaIXVSAwLvppLDt@viaduct.proxy.rlwy.net:59210', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
  }
};

module.exports = connectDB;