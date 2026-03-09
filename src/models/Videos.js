import mongoose from "mongoose";

const VideosCadastroSchema = new mongoose.Schema({
  titulo: String,
  categoria: String,
  duracao: Number,
  visualizacoes: {
    type: Number,
    default: 0,
  },
  notaMedia: {
    type: Number,
    default: 0,
  },
  dataCadastro: String,
});

VideosCadastroSchema.index({ categoria: 1 });
VideosCadastroSchema.index({ visualizacoes: -1 });

export default mongoose.model("VideosCadastro", VideosCadastroSchema);
