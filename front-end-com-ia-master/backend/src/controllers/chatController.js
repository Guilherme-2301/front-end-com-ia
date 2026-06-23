import { GoogleGenAI } from "@google/genai";

// Inicializa a IA usando o pacote oficial com a sua chave ativa
const ai = new GoogleGenAI({
  apiKey: "AQ.Ab8RN6I_wrDaD234AxyL4gBP96FpcycpgTY-FA2zDTStGqHHsA", 
});

// 1. ROTA DE PERGUNTAR (POST /chat/perguntar)
export async function perguntar(req, res) {
  try {
    const { pergunta } = req.body;

    if (!pergunta) {
      return res.status(400).json({ error: "A pergunta é obrigatória." });
    }

    // Usando o modelo correto e atual que a biblioteca @google/genai exige
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Você é a MentorIA, uma mentora de inteligência artificial desenvolvida para auxiliar alunos do SENAI.
Responda sempre em português, com explicações didáticas em tópicos e envie exemplos práticos de código se necessário.

Pergunta do estudante: ${pergunta}
`,
    });

    // Se o Google responder com sucesso, pega o texto
    const respostaTexto = response.text || "Não consegui gerar um texto agora.";

    // Retorna a resposta para o Front-end
    return res.status(200).json({ resposta: respostaTexto });

  } catch (error) {
    console.error("Erro interno no Gemini:", error);
    
    // Tratamento para o erro de limite ou indisponibilidade
    if (error.status === 503 || error.message?.includes("503") || error.message?.includes("demand")) {
      return res.status(200).json({ 
        resposta: "Opa! Estou recebendo muitas perguntas agora. Aguarde uns 5 segundos e clique em Enviar novamente! 🤖✨" 
      });
    }

    // Se der qualquer outro erro físico (como falta de internet ou chave), ele avisa o motivo real no terminal
    return res.status(200).json({ 
      resposta: "MentorIA: Conexão estabelecida, mas o serviço do Google está instável. Tente enviar novamente em instantes!" 
    });
  }
}

// 2. ROTA DE HISTÓRICO (GET /chat)
export async function listarHistorico(req, res) {
  try {
    return res.status(200).json([]);
  } catch (error) {
    console.error("Erro ao listar histórico:", error);
    return res.status(500).json({ error: "Erro interno ao buscar histórico." });
  }
}