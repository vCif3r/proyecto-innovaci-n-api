const express = require('express');
const connectDB = require('./connection/db');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
connectDB();
// Middleware
app.use(express.json());
app.use(cors());
// Rutas
app.use(routes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
