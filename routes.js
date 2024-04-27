// routes/index.js
const express = require('express');
const usuariosRouter = require('./routes/usuarioRoutes');
const authRouter = require('./routes/authRoutes');

const router = express.Router();

router.use('/api/usuarios', usuariosRouter);
router.use('/auth', authRouter);

module.exports = router;
