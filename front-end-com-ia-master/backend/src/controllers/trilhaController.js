import { Trilha, PlanoEstudo, HistoricoAvaliacao } from "../models/index.js";
import { gerarRespostaGemini } from "../config/gemini.js";

export async function gerarAvaliacao(req, res) {
  try {
    const { area } = req.body;

    const prompt = `
Gere uma prova diagnóstica sobre ${area}.
A prova deve avaliar se o aluno é Básico, Intermediário ou Avançado.

Retorne APENAS um JSON neste formato, sem markdown:
{
  "area": "${area}",
  "questoes": [
    {
      "pergunta": "Texto da pergunta",
      "alternativas": ["A) opção", "B) opção", "C) opção", "D) opção"],
      "respostaCorreta": "A"
    }
  ]
}

Gere 5 questões.
    `;

    const respostaIA = await gerarRespostaGemini(prompt);
    const avaliacao = JSON.parse(respostaIA);

    return res.status(200).json(avaliacao);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao gerar avaliação", erro: error.message });
  }
}

export async function responderAvaliacao(req, res) {
  try {
    const { area, respostas } = req.body;

    const prompt = `
Corrija a avaliação diagnóstica do aluno sobre ${area}.
Respostas do aluno: ${JSON.stringify(respostas)}

Retorne APENAS um JSON neste formato, sem markdown:
{
  "pontuacao": 8,
  "nivelAnterior": "Básico",
  "nivelAtual": "Intermediário",
  "trilha": {
    "nome": "Trilha de ${area}",
    "area": "${area}",
    "nivelObjetivo": "Avançado",
    "planos": [
      {
        "titulo": "Título do plano",
        "descricao": "Descrição do plano",
        "tempoEstimado": "2h",
        "ordem": 1
      }
    ]
  }
}
    `;

    const respostaIA = await gerarRespostaGemini(prompt);
    const dados = JSON.parse(respostaIA);

    const novaTrilha = await Trilha.create({
      nome: dados.trilha.nome,
      area: dados.trilha.area,
      nivelAtual: dados.nivelAtual,
      nivelObjetivo: dados.trilha.nivelObjetivo,
      status: "EM_ANDAMENTO",
      userId: req.user.id,
    });

    const avaliacao = await HistoricoAvaliacao.create({
      pontuacao: dados.pontuacao,
      nivelAnterior: dados.nivelAnterior,
      nivelAtual: dados.nivelAtual,
      dataAvaliacao: new Date(),
      userId: req.user.id,
      trilhaId: novaTrilha.id,
    });

    const planos = await PlanoEstudo.bulkCreate(
      dados.trilha.planos.map((plano) => ({
        titulo: plano.titulo,
        descricao: plano.descricao,
        tempoEstimado: plano.tempoEstimado,
        ordem: plano.ordem,
        progresso: 0,
        status: "PENDENTE",
        trilhaId: novaTrilha.id,
      }))
    );

    return res.status(201).json({ avaliacao, trilha: novaTrilha, planos });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao responder avaliação", erro: error.message });
  }
}

export async function listarTrilhas(req, res) {
  try {
    const trilhas = await Trilha.findAll({
      where: { userId: req.user.id },
      include: [PlanoEstudo],
    });
    return res.status(200).json(trilhas);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao listar trilhas", erro: error.message });
  }
}

export async function buscarTrilha(req, res) {
  try {
    const { id } = req.params;
    const trilha = await Trilha.findOne({
      where: { id, userId: req.user.id },
      include: [PlanoEstudo, HistoricoAvaliacao],
    });

    if (!trilha) return res.status(404).json({ mensagem: "Trilha não encontrada" });

    return res.status(200).json(trilha);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao buscar trilha", erro: error.message });
  }
}

export async function excluirTrilha(req, res) {
  try {
    const { id } = req.params;
    const trilha = await Trilha.findOne({ where: { id, userId: req.user.id } });

    if (!trilha) return res.status(404).json({ mensagem: "Trilha não encontrada" });

    await trilha.destroy();
    return res.status(200).json({ mensagem: "Trilha excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao excluir trilha", erro: error.message });
  }
}