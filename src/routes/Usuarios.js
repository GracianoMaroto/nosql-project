import express from "express";
import UsuariosCadastro from "../models/Usuarios.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const novoUsuario = await UsuariosCadastro.create(req.body);
    res.json(novoUsuario);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const usuarios = await UsuariosCadastro.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const usuario = await UsuariosCadastro.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const usuarioAtualizado = await UsuariosCadastro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json(usuarioAtualizado);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await UsuariosCadastro.findByIdAndDelete(req.params.id);

    res.json({ mensagem: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

export default router;
