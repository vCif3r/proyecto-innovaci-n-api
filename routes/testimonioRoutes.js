const express = require("express");
const router = express.Router();
const Testimonio = require("../models/Testimonio");
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/", async (req, res) => {
  try {
    const testimonios = await Testimonio.find();
    res.json(testimonios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { img, title, description } = req.body; // Se espera que los datos del testimonio se envíen en el cuerpo de la solicitud

    // Verifica si se proporcionan los campos requeridos
    if (!img || !title || !description) {
      return res
        .status(400)
        .json({
          message: "Se requieren todos los campos :)",
        });
    }

    // Crea un nuevo documento de testimonio
    const nuevoTestimonio = new Testimonio({ img, title, description });

    // Guarda el nuevo testimonio en la base de datos
    await nuevoTestimonio.save();

    // Devuelve el testimonio recién creado como respuesta
    res.status(201).json(nuevoTestimonio);
  } catch (error) {
    // Si hay un error, devuelve un mensaje de error al cliente
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { img, title, description } = req.body;

  try {
    const testimonio = await Testimonio.findByIdAndUpdate(
      req.params.id,
      { img, title, description },
      { new: true }
    );

    if (!testimonio) {
      return res.status(404).json({ message: "Testimonio no encontrado" });
    }

    console.log("Testimonio actualizado:", testimonio);
    res.json({ success: true, message: "Testimonio actualizado correctamente", testimonio });
  } catch (error) {
    console.error("Error al actualizar el testimonio:", error); // Agrega un log para más detalles
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const testimonios = await Testimonio.findById(req.params.id);
    if (!testimonios) {
      return res.status(404).json({ message: "mascota no encontrada" });
    }
    await testimonios.deleteOne();
    console.log("Mascota deleted!")
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;