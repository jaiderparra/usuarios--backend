// backendParcial/models/registro.js
import mongoose from "mongoose";

const RegistroSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    hora: { type: String, required: true },
    fecha: { type: Date, default: Date.now } // 👈 para poder ordenar y ver cuándo se creó
  },
  { collection: "registros" }
);

export default mongoose.model("Registro", RegistroSchema);
