import mongoose from "mongoose";

const grupoIdade = {
  INFANTIL: "INFANTIL",
  ADULTO: "ADULTO",
};

const PerfisSchema = new mongoose.Schema({
  name: String,
  grupoIdade: {
    type: String,
    enum: Object.values(grupoIdade),
  },
});

const UsuariosCadastroSchema = new mongoose.Schema({
  name: String,
  email: String,
  dataCriacao: String,
  perfis: [PerfisSchema],
});

export default mongoose.model("UsuariosCadastro", UsuariosCadastroSchema);
