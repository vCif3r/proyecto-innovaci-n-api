const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para obtener todos los usuarios
router.get('/', authMiddleware, async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  const usuario = new Usuario({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const nuevoUsuario = await usuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;