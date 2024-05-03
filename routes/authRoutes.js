const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Busca al usuario en la base de datos por su email
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res
      .status(401)
      .json({ success: false, message: "Credenciales inválidas" });
  }

  // Comprueba la contraseña
  const validPassword = await bcrypt.compare(password, usuario.password);
  if (!validPassword) {
    return res
      .status(401)
      .json({ success: false, message: "Credenciales inválidas" });
  }

  // Genera el token JWT
  // Genera el token JWT con ID, email y username
  const token = jwt.sign(
    { _id: usuario._id, avatar: usuario.avatar, username: usuario.username, email: usuario.email, roles: usuario.roles },
    "secreto",
    { expiresIn: "1h" }
  );

  res.status(200).json({ success: true, token });
});

// Ruta para el registro de usuario
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Verifica si el correo electrónico ya está en uso
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    return res.status(400).json({
      success: false,
      message: "El correo electrónico ya está registrado",
    });
  }

  // Cifra la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crea un nuevo usuario
  const nuevoUsuario = new Usuario({ username, email, password: hashedPassword });

  try {
    await nuevoUsuario.save();
    res
      .status(201)
      .json({ success: true, message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
module.exports = router;
