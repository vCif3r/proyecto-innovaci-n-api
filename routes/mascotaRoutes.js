const express = require('express');
const router = express.Router();
const Mascota = require('../models/Mascota');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta publica para obtener todas las mascotas
router.get('/', async (req, res) => {
    try {
      const mascotas = await Mascota.find();
      res.json(mascotas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// Ruta para crear una nueva mascota
router.post('/', authMiddleware,async (req, res) => {
    const mascota = new Mascota({
      name: req.body.name,
      age: req.body.age,
      description: req.body.description,
    });
  
    try {
      const nuevaMascota = await mascota.save();
      res.status(201).json('Mascota agregada: ',nuevaMascota);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
  
module.exports = router;