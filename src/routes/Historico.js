import express from "express";
import HistoricoRegistro from "../models/Historico.js";
import VideosCadastro from "../models/Videos.js";

const router = express.Router();
router.get("/usuario/:id", async (req, res) => {
  const historico = await HistoricoRegistro.aggregate([
    {
      $match: {
        id_usuario: req.params.id,
      },
    },
    {
      $lookup: {
        from: "videoscadastros",
        localField: "id_video",
        foreignField: "_id",
        as: "video",
      },
    },
  ]);

  res.json(historico);
});

router.post("/", async (req, res) => {
  try {
    const historico = await HistoricoRegistro.create(req.body);

    // incrementa visualizações
    await VideosCadastro.updateOne(
      { _id: req.body.id_video },
      { $inc: { visualizacoes: 1 } },
    );

    // recalcula nota média
    if (req.body.avaliacao) {
      const media = await HistoricoRegistro.aggregate([
        {
          $match: {
            id_video: req.body.id_video,
            avaliacao: { $exists: true },
          },
        },
        {
          $group: {
            _id: "$id_video",
            media: { $avg: "$avaliacao" },
          },
        },
      ]);

      if (media.length > 0) {
        await VideosCadastro.updateOne(
          { _id: req.body.id_video },
          { notaMedia: media[0].media },
        );
      }
    }

    res.json(historico);
  } catch (error) {
    res.json(error);
  }
});

export default router;
