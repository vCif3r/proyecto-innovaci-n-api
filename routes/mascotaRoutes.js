const express = require("express");
const router = express.Router();
const Mascota = require("../models/Mascota");
const authMiddleware = require("../middlewares/authMiddleware");

// Ruta publica para obtener todas las mascotas, requiere autenticacion 
router.get("/", authMiddleware, async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/disponibles", async (req, res) => {
  try {
    const mascotas = await Mascota.find({ state: "disponible" });
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) {
      return res.status(404).json({ message: "mascota no encontrada" });
    }
    res.json(mascota);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear una nueva mascota
router.post("/", authMiddleware, async (req, res) => {
  const mascota = new Mascota(req.body);
  console.log("mascota registrada: ", mascota);
  try {
    await mascota.save();
    res
      .status(201)
      .json({ success: true, message: "Mascota registrada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) {
      return res.status(404).json({ message: "mascota no encontrada" });
    }
    await mascota.deleteOne();
    console.log("Mascota deleted!")
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para actualizar una mascota
router.put("/:id", authMiddleware, async (req, res) => {
  const { img, name, raza, age, description, state } = req.body; // Puedes ajustar los campos según tu modelo

  try {
    const mascota = await Mascota.findByIdAndUpdate(
      req.params.id,
      { img, name, raza, age, description, state }, // Aquí se especifican los campos que deseas actualizar
      { new: true } // Esto devuelve el documento actualizado
    );

    if (!mascota) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    console.log("Mascota actualizada:", mascota);
    res.json({ success: true, message: "Mascota actualizada correctamente", mascota });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;