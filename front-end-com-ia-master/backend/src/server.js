import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import trilhaRoutes from "./routes/trilhaRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/trilhas", trilhaRoutes);

app.get("/", (req, res) => {
  res.json({ mensagem: "Backend MentorIA rodando!" });
});

sequelize.sync({ alter: true }).then(() => {
  console.log("Banco de dados sincronizado!");
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});