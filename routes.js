// routes/index.js
const express = require('express');
const usuariosRouter = require('./routes/usuarioRoutes');
const authRouter = require('./routes/authRoutes');
const mascotasRouter = require('./routes/mascotaRoutes');
const testimonioRouter = require('./routes/testimonioRoutes');
const router = express.Router();

// Definir grupo de rutas para /api
const apiRouter = express.Router();
apiRouter.use('/usuarios', usuariosRouter);
apiRouter.use('/mascotas', mascotasRouter);
apiRouter.use('/testimonios', testimonioRouter);

router.use('/api', apiRouter);
// auth route
router.use('/auth', authRouter);

module.exports = router;