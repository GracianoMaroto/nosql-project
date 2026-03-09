import express from "express";

const router = express.Router();

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
export default router;
