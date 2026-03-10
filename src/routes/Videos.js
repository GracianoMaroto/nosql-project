import express from "express";
import VideosCadastro from "../models/Videos.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const novoVideo = await VideosCadastro.create(req.body);
    res.json(novoVideo);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const videos = await VideosCadastro.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.get("/mais-assistidos", async (req, res) => {
  const videos = await VideosCadastro.find()
    .sort({ visualizacoes: -1 })
    .limit(10);

  res.json(videos);
});

router.get("/categoria/:categoria", async (req, res) => {
  const videos = await VideosCadastro.find({
    categoria: req.params.categoria,
  });

  res.json(videos);
});

router.get("/:id", async (req, res) => {
  try {
    const video = await VideosCadastro.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ erro: "Vídeo não encontrado" });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
export default router;
