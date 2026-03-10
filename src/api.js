import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./databse/connection.js";
import usuarios from "./routes/Usuarios.js";
import videos from "./routes/Videos.js";
import historico from "./routes/Historico.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

connectDB();

app.use("/usuarios", usuarios);
app.use("/videos", videos);
app.use("/historico", historico);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
