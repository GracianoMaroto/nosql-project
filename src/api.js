// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import UsuariosCadastro from "./src/models/models/UsuariosCadastro.js";
// import VideosCadastro from "./src/models/models/VideosCadastro.js";
// import HistoricoRegistro from "./src/models/models/HistoricoRegistro.js";

// dotenv.config();

// const app = express();
// const PORT = 3000;

// app.use(express.json());

// const connetDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Conectado ao banco");
//   } catch (error) {
//     console.log("Erro ao conectar ao banco", error);
//   }
// };
// connetDB();

// // USUÁRIOS
// app.post("/usuarios", async (req, res) => {
//   try {
//     const novoUsuario = await UsuariosCadastro.create(req.body);
//     res.json(novoUsuario);
//   } catch (error) {
//     res.json({ error: error });
//   }
// });
// app.get("/usuarios", async (req, res) => {
//   try {
//     const buscarUsuarios = await UsuariosCadastro.find();
//     res.json(buscarUsuarios);
//   } catch (error) {
//     res.json({ error: error });
//   }
// });
// // VÍDEOS
// app.post("/videos", async (req, res) => {
//   try {
//     const novoVideo = await VideosCadastro.create(req.body);
//     res.json(novoVideo);
//   } catch (error) {
//     res.json({ error: error });
//   }
// });
// app.get("/videos", async (req, res) => {
//   try {
//     const buscarVideos = await VideosCadastro.find();
//     res.json(buscarVideos);
//   } catch (error) {
//     res.json({ error: error });
//   }
// });
// // HISTÓRICO
// app.post("/historico", async (req, res) => {
//   try {
//     const novoHistorico = await HistoricoRegistro.create(req.body);
//     res.json(novoHistorico);
//   } catch (error) {
//     res.json({ error: error });
//   }
// });
// app.get("/historico", async (req, res) => {
//   try {
//     const buscarHistorico = await HistoricoRegistro.find();
//     res.json(buscarHistorico);
//   } catch (error) {
//     res.json({ error: error });
//   }
// });
// app.get("/historico/:id", async (req, res) => {
//   try {
//     const buscarHistorico = await HistoricoRegistro.findById(req.params.id);
//     res.json(buscarHistorico);
//   } catch (error) {
//     res.json({ error: error });
//   }
// });

// app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./databse/connection.js";

// import usuarios from "./routes/usuarios.js";
// import videos from "./routes/videos.js";
// import historico from "./routes/historico.js";
import usuarios from "./routes/Usuarios.js";
import videos from "./routes/Videos.js";
import historico from "./routes/Historico.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/usuarios", usuarios);
app.use("/videos", videos);
app.use("/historico", historico);

app.listen(3000, () => console.log("Servidor rodando"));
