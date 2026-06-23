
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Usuario = sequelize.define("Usuario", {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
});

export const Trilha = sequelize.define("Trilha", {
  nome: { type: DataTypes.STRING, allowNull: false },
  area: { type: DataTypes.STRING, allowNull: false },
  nivelAtual: { type: DataTypes.STRING, defaultValue: "Básico" },
  nivelObjetivo: { type: DataTypes.STRING, defaultValue: "Avançado" },
  status: { type: DataTypes.STRING, defaultValue: "EM_ANDAMENTO" },
});

export const PlanoEstudo = sequelize.define("PlanoEstudo", {
  titulo: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT },
  tempoEstimado: { type: DataTypes.STRING },
  ordem: { type: DataTypes.INTEGER },
  progresso: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: { type: DataTypes.STRING, defaultValue: "PENDENTE" },
});

export const HistoricoAvaliacao = sequelize.define("HistoricoAvaliacao", {
  pontuacao: { type: DataTypes.FLOAT },
  nivelAnterior: { type: DataTypes.STRING },
  nivelAtual: { type: DataTypes.STRING },
  dataAvaliacao: { type: DataTypes.DATE },
});

export const HistoricoChat = sequelize.define("HistoricoChat", {
  pergunta: { type: DataTypes.TEXT },
  resposta: { type: DataTypes.TEXT },
  dataHora: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Relacionamentos
Usuario.hasMany(Trilha, { foreignKey: "userId" });
Trilha.belongsTo(Usuario, { foreignKey: "userId" });

Trilha.hasMany(PlanoEstudo, { foreignKey: "trilhaId" });
PlanoEstudo.belongsTo(Trilha, { foreignKey: "trilhaId" });

Trilha.hasMany(HistoricoAvaliacao, { foreignKey: "trilhaId" });
HistoricoAvaliacao.belongsTo(Trilha, { foreignKey: "trilhaId" });

Usuario.hasMany(HistoricoAvaliacao, { foreignKey: "userId" });
HistoricoAvaliacao.belongsTo(Usuario, { foreignKey: "userId" });

Usuario.hasMany(HistoricoChat, { foreignKey: "userId" });
HistoricoChat.belongsTo(Usuario, { foreignKey: "userId" });

export default sequelize;