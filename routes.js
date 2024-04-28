// routes/index.js
const express = require('express');
const usuariosRouter = require('./routes/usuarioRoutes');
const authRouter = require('./routes/authRoutes');
const mascotasRouter = require('./routes/mascotaRoutes')
const router = express.Router();

router.use('/api/usuarios', usuariosRouter);
router.use('/auth', authRouter);
router.use('/api/mascotas', mascotasRouter)

module.exports = router;