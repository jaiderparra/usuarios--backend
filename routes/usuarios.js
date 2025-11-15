// backendParcial/routes/usuarios.js
import express from "express";
import Registro from "../models/registro.js";

const router = express.Router();

// POST /api/registros => guardar en Mongo
router.post("/registros", async (req, res) => {
  try {
    console.log("➡ POST /api/registros body:", req.body);

    const { nombre, apellido, hora } = req.body;

    if (!nombre || !apellido || !hora) {
      return res.status(400).json({ msg: "nombre, apellido y hora son obligatorios" });
    }

    const nuevo = await Registro.create({ nombre, apellido, hora });

    console.log("✅ Registro creado:", nuevo);
    return res.status(201).json({ msg: "Guardado correctamente", data: nuevo });
  } catch (error) {
    console.error("❌ Error al guardar:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
});

// GET /api/registros => obtener todos
router.get("/registros", async (req, res) => {
  try {
    console.log("➡ GET /api/registros");

    const registros = await Registro.find().sort({ fecha: -1 });

    console.log(`✅ ${registros.length} registros encontrados`);
    return res.json(registros);
  } catch (error) {
    console.error("❌ Error al obtener:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
});

export default router;
