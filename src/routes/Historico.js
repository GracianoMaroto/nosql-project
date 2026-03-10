import express from "express";
import HistoricoRegistro from "../models/Historico.js";
import VideosCadastro from "../models/Videos.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const historico = await HistoricoRegistro.find();
    res.json(historico);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const historico = await HistoricoRegistro.findById(req.params.id);

    if (!historico) {
      return res.status(404).json({ erro: "Historico não encontrado" });
    }

    res.json(historico);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

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

    await VideosCadastro.updateOne(
      { _id: req.body.id_video },
      { $inc: { visualizacoes: 1 } },
    );

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
