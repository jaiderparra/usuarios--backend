// migrate.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Registro from "./models/registro.js";

dotenv.config();

const runMigration = async () => {
  try {
    console.log("Conectando a Mongo Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conexión establecida ✔");

    // Verificar si la colección existe
    const exists = await mongoose.connection.db
      .listCollections({ name: "registros" })
      .toArray();

    if (exists.length === 0) {
      console.log("La colección 'registros' no existe. Creando...");

      await mongoose.connection.db.createCollection("registros");
      console.log("Colección creada ✔");
    } else {
      console.log("La colección 'registros' ya existe ✔");
    }

    // Insertar registro inicial (opcional)
    const registroInicial = new Registro({
      nombre: "Migración",
      apellido: "Inicial",
      hora: "00:00:00",
    });

    await registroInicial.save();
    console.log("Registro inicial insertado ✔");

    console.log("Migración completada con éxito 🎉");
    process.exit(0);

  } catch (error) {
    console.error("Error en la migración:", error);
    process.exit(1);
  }
};

runMigration();
