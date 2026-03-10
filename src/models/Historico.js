import mongoose from "mongoose";

const HistoricoRegistroSchema = new mongoose.Schema({
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UsuariosCadastro",
  },
  id_video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VideosCadastro",
  },
  data_visualizacao: String,
  progresso: { type: Number, min: 0, max: 100 },
  avaliacao: {
    type: Number,
    min: 1,
    max: 5,
  },
});

HistoricoRegistroSchema.index({ id_usuario: 1 });
HistoricoRegistroSchema.index({ id_video: 1 });

export default mongoose.model("HistoricoRegistro", HistoricoRegistroSchema);
