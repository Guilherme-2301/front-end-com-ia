import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/index.js";
import dotenv from "dotenv";

dotenv.config();

export async function cadastrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
    });

    return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!", usuario });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao cadastrar", erro: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ mensagem: "Login realizado com sucesso!", token, usuario });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao fazer login", erro: error.message });
  }
}